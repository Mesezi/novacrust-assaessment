'use client'
import CryptoToCashForm from "./components/form-sections/crypto-to-cash";
import { useQueryState } from "nuqs";
import CashToCrypto from "./components/form-sections/CashToCrypto";
import CryptoToFlatLoan from "./components/form-sections/CryptoToFlatLoan";

export default function Home() {

      const [activeTab, setActiveTab] = useQueryState("tab", {
  defaultValue: "CRYPTO_TO_CASH",
});


  return (
    <div className="min-h-dvh grid place-items-center">

      <article className="p-10 py-9 md:my-20 bg-white rounded-2xl md:border md:border-customGray-200 w-full max-w-150 ">

      
      {(activeTab === 'CRYPTO_TO_CASH') && <CryptoToCashForm />}
      {(activeTab === 'CASH_TO_CRYPTO') && <CashToCrypto />}
      {(activeTab === 'CRYPTO_TO_FLAT_LOAN') && <CryptoToFlatLoan />}

      </article>
    </div>
  );
}
