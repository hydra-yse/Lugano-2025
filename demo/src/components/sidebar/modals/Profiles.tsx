import type { BindingLiquidSdk, Payment, WalletInfo } from "@breeztech/breez-sdk-liquid/web"
import { Modal, type ModalProps } from "@components/Modal"
import { P1_SDK, P2_SDK } from "BreezSdk"
import { useEffect, useState } from "react";

interface ProfilesCardProps {
  sdk: BindingLiquidSdk | null,
  playerName: string,
}

export const ProfileCard = ({ sdk, playerName }: ProfilesCardProps) => {
  const [info, setInfo] = useState<WalletInfo | null>(null);
  const [payments, setPayments] = useState<Payment[] | null>(null);
  if (!sdk) return 'Loading...';

  useEffect(() => {
    setTimeout(() => {
      sdk.getInfo()
        .then((info) => setInfo(info.walletInfo));

      sdk.listPayments({})
        .then(setPayments);
    }, 2000)
  }, [])

  const getMoneyLost = (): number => {
    let moneyLost = 0;
    payments?.forEach((payment) => {
      switch (payment.paymentType) {
        case 'send':
          moneyLost += payment.amountSat;
      }
    })
    return moneyLost;
  }

  const getGamesWon = (): number => {
    let gamesWon = 0;
    payments?.forEach((payment) => {
      switch (payment.paymentType) {
        case 'receive':
          gamesWon += 1;
      }
    })
    return gamesWon;
  }

  return (
    <div className="flex flex-col border-1 rounded-lg border-primary p-5 gap-1 w-full">
      <div className="flex self-center rounded-full bg-primary w-[90px] p-4">
        <img className="h-[55px] mx-auto" src='https://cdn-icons-png.flaticon.com/512/1077/1077114.png' />
      </div>

      <h2 className="text-lg font-bold">{playerName}</h2>
      <div className="text-sm">
        <span>Games won: {getGamesWon()}</span><br />
        <span>Money lost: {getMoneyLost()} sats</span><br />
        <span>Current balance: {info?.balanceSat}</span><br />
      </div>
    </div>
  )
}

export const ProfilesModal = (props: ModalProps) => {
  return (
    <Modal {...props}>
      <h1 className="text-2xl mb-1">Profiles</h1>
      <div className="flex flex-col w-full px-4 py-2 gap-3">
        <ProfileCard playerName='P1' sdk={P1_SDK} />
        <ProfileCard playerName='P2' sdk={P2_SDK} />
      </div>
    </Modal>
  )
}
