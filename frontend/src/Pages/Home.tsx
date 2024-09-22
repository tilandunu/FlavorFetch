import FlavorFooter from "@/components/FlavorFooter";
import FlavorHeader from "@/components/FlavorHeader";

const Home = () => {
  return (
    <div className="font-poppins">
      <div
        className="bg-slate-200"
        style={{
          backgroundImage: `url("/new.jpg")`,
          backgroundSize: "130% auto", // Ensures the image covers the width fully and adjusts the height accordingly
          backgroundPosition: "top",
          minHeight: "100vh", // Ensure the background covers the full viewport height
        }}
      >
        <div className="flex justify-center">
          <img className="w-80" src="/trans-black.svg" alt="" />
        </div>
        <div className="py-20">
          <FlavorHeader />
        </div>
        <div className="flex justify-center mx-16 px-10 py-10 mb-20 h-[600px] bg-white rounded-3xl">
          <p>Preference</p>
        </div>

        <div className="flex justify-center mx-16 px-10 py-10 mb-20 h-[600px] bg-white rounded-3xl">
          <p>FOR YOU</p>
        </div>

        <FlavorFooter />
      </div>
    </div>
  );
};

export default Home;
