import type { BindingLiquidSdk } from "@breeztech/breez-sdk-liquid/web"
import { Modal, type ModalProps } from "@components/Modal"
import { P1_SDK, P2_SDK } from "BreezSdk"
import { QRCodeSVG } from 'qrcode.react';
import { DocumentDuplicateIcon, CheckIcon } from '@heroicons/react/24/solid'
import { useState } from "react";

interface ProfilesCardProps {
  sdk: BindingLiquidSdk | null,
  playerName: string,
}

// TODO: Add your code here
export const PlayerQR = ({ sdk, playerName }: ProfilesCardProps) => {
  const [copied, setCopied] = useState<boolean>(false);
  if (!sdk) return 'Loading...';

  const copy = () => {
    navigator.clipboard.writeText("CHANGEME");
    setCopied(true);
  }
  return (
    <div className="flex flex-col p-5 gap-2 w-full">
      <h2 className="text-2xl font-bold">{playerName}</h2>
      <QRCodeSVG value="CHANGEME" size={180} style={{ alignSelf: 'center', padding: '5px' }} />
      <div onClick={copy} className="flex gap-1 items-center justify-center bg-primary rounded-lg text-black w-[80px] p-2 self-center cursor-pointer">
        {
          copied ? <>
            <CheckIcon height={16} />
            Copied
          </>
            :
            <>
              <DocumentDuplicateIcon height={16} />
              Copy
            </>
        }
      </div>
    </div>
  )
}

export const TopUpModal = (props: ModalProps) => {
  return (
    <Modal {...props}>
      <h1 className="text-2xl">Top-Up</h1>
      <div className="flex w-full px-4 py-2">
        <PlayerQR playerName='P1' sdk={P1_SDK} />
        <PlayerQR playerName='P2' sdk={P2_SDK} />
      </div>
    </Modal>
  )
}
