// src/types/declarations.d.ts


declare module "*.jpg" {
    const value: string;
    export default value;
  }
  
  declare module "*.jpeg" {
    const value: string;
    export default value;
  }
  
  declare module "*.png" {
    const value: string;
    export default value;
  }
  
  declare module "*.gif" {
    const value: string;
    export default value;
  }

  declare module 'jspdf' {
    interface jsPDF {
      autoTable(options: any): void;
    }
  }
  