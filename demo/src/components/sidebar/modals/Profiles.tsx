import type { BindingLiquidSdk } from "@breeztech/breez-sdk-liquid/web"
import { Modal, type ModalProps } from "@components/Modal"
import { P1_SDK, P2_SDK } from "BreezSdk"

interface ProfilesCardProps {
  sdk: BindingLiquidSdk | null,
  playerName: string,
}

export const ProfileCard = ({ sdk, playerName }: ProfilesCardProps) => {
  if (!sdk) return 'Loading...';
  return (
    <div className="flex flex-col border-1 rounded-lg border-primary p-5 gap-1 w-full">
      <div className="flex self-center rounded-full bg-primary w-[90px] p-4">
        <img className="h-[55px] mx-auto" src='https://cdn-icons-png.flaticon.com/512/1077/1077114.png' />
      </div>

      <h2 className="text-lg font-bold">{playerName}</h2>
      <div className="text-sm">
        <span>Games won: {0}</span><br />
        <span>Money lost: {0}</span><br />
        <span>Current balance: {0}</span><br />
      </div>
    </div>
  )
}

export const ProfilesModal = (props: ModalProps) => {
  // TODO: Add your code here
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
