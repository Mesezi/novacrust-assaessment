import React from "react";
import FormDropdown from "../../inputs/FormDropdown";
import TabToggle from "../../TabToggle";
import { useQueryState } from "nuqs";
import Image from "next/image";
import { useFormContext } from "react-hook-form";

export const tabOptions = [
  {
    label: "Crypto to Cash",
    value: "CRYPTO_TO_CASH",
  },
  {
    label: "Cash to Crypto",
    value: "CASH_TO_CRYPTO",
  },
  {
    label: "Crypto to Flat Loan",
    value: "CRYPTO_TO_FLAT_LOAN",
  },
];

export const cryptoNetworkOptions = [
  {
    label: "USDT - ETH",
    value: "USDT_ETH",
    shortLabel: "ETH",
    icon: <Image src="/images/icons/eth.svg" alt="" height={24} width={24} />,
  },
  {
    label: "USDT - CELO",
    shortLabel: "CELO",
    value: "USDT_CELO",
    icon: <Image src="/images/icons/celo.svg" alt="" height={24} width={24} />,
  },
  {
    label: "USDT - TON",
    value: "USDT_TON",
    shortLabel: "TON",
    icon: <Image src="/images/icons/ton.svg" alt="" height={24} width={24} />,
  },
  {
    label: "USDT - BNB",
    value: "USDT_BNB",
    shortLabel: "BNB",
    icon: <Image src="/images/icons/bnb.svg" alt="" height={24} width={24} />,
  },
];

export const walletOptions = [
  {
    label: "Metamask",
    value: "metamask",
    icon: (
      <Image src="/images/icons/metamask.svg" alt="" height={24} width={24} />
    ),
  },
  {
    label: "Rainbow",
    value: "rainbow",
    icon: (
      <Image src="/images/icons/rainbow.svg" alt="" height={24} width={24} />
    ),
  },
  {
    label: "WalletConnect",
    value: "walletconnect",
    icon: (
      <Image src="/images/icons/wallet.svg" alt="" height={24} width={24} />
    ),
  },
  {
    label: "Other Crypto Wallets (Binance, Coinbase, Bybit etc)",
    value: "other",
    icon: <Image src="/images/icons/other.svg" alt="" height={24} width={24} />,
  },
];

const currencyOptions = [
  {
    label: "NGN",
    value: "NGN",
    icon: (
      <Image src="/images/icons/nig_flag.svg" alt="" height={24} width={24} />
    ),
  },
];

const Step1 = () => {
  const [activeTab, setActiveTab] = useQueryState("tab", {
    defaultValue: "CRYPTO_TO_CASH",
  });
  const methods = useFormContext();
  const { watch } = methods;

  return (
    <>
      <TabToggle
        activeTab={activeTab || ""}
        onTabChange={setActiveTab}
        options={tabOptions}
      />

      <div className="border rounded-3xl border-customGray-200 p-5 mt-5">
        <p className="text-customGray-300 text-sm">You pay</p>

        <article className="flex justify-between items-center">
          <h5 className="text-xl font-semibold text-[#000E10]">1.00</h5>

          <div>
            <FormDropdown
              name={"payCurrency"}
              searchable
              className="h-10"
              options={cryptoNetworkOptions}
              value={watch("payCurrency")}
            />
          </div>
        </article>
      </div>

      <div className="border rounded-3xl border-customGray-200 p-5">
        <p className="text-customGray-300 text-sm">You receive</p>

        <article className="flex justify-between items-center">
          <h5 className="text-xl font-semibold text-[#000E10]">1.00</h5>

          <div>
            <FormDropdown
              name={"receiveCurrency"}
              className="h-10"
              options={currencyOptions}
              value={watch("receiveCurrency")}
            />
          </div>
        </article>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="" className="text-primaryColor">
          Pay from
        </label>

        <FormDropdown
          name={"payFrom"}
          placeholder="Select an option"
          className="h-14 bg-white"
          options={walletOptions}
          value={watch("payFrom")}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="" className="text-primaryColor">
          Pay to
        </label>

        <FormDropdown
          name={"payTo"}
          placeholder="Select an option"
          className="h-14 bg-white"
          options={walletOptions}
          value={watch("payTo")}
        />
      </div>
    </>
  );
};

export default Step1;
