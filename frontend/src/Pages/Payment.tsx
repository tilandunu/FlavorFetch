import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { toast } from "react-toastify";
import { Progress } from "@/components/ui/progress";
import * as React from "react";

const Payment = () => {
  const { orderID } = useParams();
  const navigate = useNavigate();
  const [orderDetails, setOrderDetails] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("CashOnDelivery");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cvv, setCvv] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/api/order/${orderID}`
        );
        const { ingredients } = response.data;

        setOrderDetails(response.data);

        const processedIngredients = ingredients.map((ingredient) => ({
          name: ingredient.ingredientName,
          quantity: ingredient.quantity,
        }));

        setIngredients(processedIngredients);
      } catch (error) {
        toast.error("Failed to fetch order details");
      }
    };

    fetchOrderDetails();
  }, [orderID]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if delivery address is empty
    if (!deliveryAddress.trim()) {
      toast.error("Delivery address is required");
      return;
    }

    // If payment method is "Debit/Credit", validate card number and CVV
    if (paymentMethod === "Debit/Credit") {
      // Card number should not be empty
      if (!cardNumber.trim()) {
        toast.error("Card number is required");
        return;
      }

      // Card number validation: only digits, length of 16
      if (!/^\d{16}$/.test(cardNumber)) {
        toast.error("Card number must be exactly 16 digits");
        return;
      }

      // CVV should not be empty
      if (!cvv.trim()) {
        toast.error("CVV is required");
        return;
      }

      // CVV validation: only digits, length of 3
      if (!/^\d{3}$/.test(cvv)) {
        toast.error("CVV must be exactly 3 digits");
        return;
      }
    }

    setLoading(true); // Start loading
    setProgress(0); // Reset progress

    try {
      await axios.put(`http://localhost:3001/api/order/save/${orderID}`, {
        paymentMethod,
        deliveryAddress,
        status: "To-Be-Delivered",
      });

      setTimeout(() => {
        setLoading(false);
        navigate("/success");
      }, 2000);
    } catch (error) {
      toast.error("Failed to update the order");
      setLoading(false);
    }
  };

  // Progress effect with gradual increment
  useEffect(() => {
    let progressInterval;
    if (loading) {
      progressInterval = setInterval(() => {
        setProgress((prev) => {
          if (prev < 100) {
            return prev + 1;
          } else {
            clearInterval(progressInterval);
            return prev;
          }
        });
      }, 50);
    }
    return () => clearInterval(progressInterval);
  }, [loading]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen flex-col">
        <p className="text-sm my-2">VALIDATING YOUR DATA</p>
        <Progress value={progress} className="w-[60%]" />
      </div>
    );
  }

  if (!orderDetails) return <p>Loading order details...</p>;

  return (
    <div className="flex bg-emerald-700 h-screen font-poppins">
      <div className="flex rounded-xl justify-center shadow-lg w-screen m-7 p-10 bg-white">
        <div className="flex flex-col w-1/4 mx-10 mr-20">
          <div className="flex items-center justify-between">
            <img src="../trans black.png" className="w-20" alt="LOGO" />
            <p>{ingredients.length} ITEMS</p>
          </div>
          <div className="flex flex-col border border-stone-600 rounded-lg p-10 gap-10 mt-3">
            {ingredients.map((ingredient, index) => (
              <div key={index} className="flex justify-between">
                <p>{ingredient.name}</p>
                <p>{ingredient.quantity}</p>
              </div>
            ))}
          </div>
          <div className="flex flex-col mt-20 gap-2 mx-3">
            <p>TOTAL</p>
            <p className="text-3xl text-green-600 font-medium cursor-pointer duration-500">
              Rs.{orderDetails.totalAmount.toFixed(2)}
            </p>
          </div>
        </div>
        <div>
          <Separator orientation="vertical" className="bg-stone-300" />
        </div>
        <form onSubmit={handleSubmit} className="flex w-1/2 mx-20 my-10">
          <div className="flex flex-col w-full">
            <div className="flex flex-col gap-8 mb-10">
              <div className="flex flex-col gap-2">
                <p className="text-sm">PAYMENT METHOD</p>
                <Select onValueChange={(value) => setPaymentMethod(value)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="CashOnDelivery">
                      CASH ON DELIVERY
                    </SelectItem>
                    <SelectItem value="Debit/Credit">
                      DEBIT OR CREDIT
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-sm">DELIVERY ADDRESS</p>
                <Input
                  type="text"
                  value={deliveryAddress}
                  onChange={(e) => setDeliveryAddress(e.target.value)}
                />
              </div>

              {paymentMethod === "Debit/Credit" && (
                <>
                  <div className="flex flex-col gap-2">
                    <p className="text-sm">DEBIT/CREDIT CARD NUMBER</p>
                    <Input
                      type="text"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <p className="text-sm">CVV</p>
                    <Input
                      type="text"
                      value={cvv}
                      onChange={(e) => setCvv(e.target.value)}
                    />
                  </div>
                </>
              )}
            </div>
            <div className="flex gap-8 justify-end">
              <Button
                type="button"
                className="bg-stone-300 text-stone-700 w-40 hover:bg-stone-700 hover:text-white duration-1000"
              >
                CANCEL
              </Button>
              <Button
                className="bg-green-500 text-white w-40 hover:bg-black hover:text-white duration-500"
                type="submit"
              >
                SUBMIT
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Payment;
