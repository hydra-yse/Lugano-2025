import { Modal, type ModalProps } from "@components/Modal"
import { useState } from "react"

export interface HistoryItemProps {
  timestamp: number;
  amountWon: number;
  winner: string;
}

const HistoryItem = ({ timestamp, winner, amountWon }: HistoryItemProps) => {
  const timestampToDate = new Date(timestamp * 1000);
  return (
    <div className="flex w-full justify-between gap-5 px-5 py-3 border-primary font-bold border-b-1">
      <span className="min-w-[50%]">{timestampToDate.toLocaleString()}</span>
      <span>{winner} </span>
      <span className="min-w-[30%]">+{new Intl.NumberFormat().format(amountWon)} sats</span>
    </div>
  )
}

export const HistoryModal = (props: ModalProps) => {
  // TODO: Add your code here
  const [history, _setHistory] = useState<HistoryItemProps[]>([
    {
      timestamp: 1764976320,
      amountWon: 3000,
      winner: 'P1',
    },
    {
      timestamp: 1764972120,
      amountWon: 20000,
      winner: 'P1',
    },
    {
      timestamp: 1764976120,
      amountWon: 7000,
      winner: 'P2',
    },
    {
      timestamp: 1764976120,
      amountWon: 7000,
      winner: 'P2',
    },
    {
      timestamp: 1764976120,
      amountWon: 7000,
      winner: 'P2',
    },
    {
      timestamp: 1764976120,
      amountWon: 7000,
      winner: 'P2',
    },
    {
      timestamp: 1764976120,
      amountWon: 7000,
      winner: 'P2',
    },
    {
      timestamp: 1764976120,
      amountWon: 7000,
      winner: 'P2',
    },
  ]);

  return (
    <Modal {...props}>
      <h1 className="text-2xl mb-1">History</h1>
      <div className="flex w-full justify-between gap-5 px-5 py-3 border-primary font-bold border-b-2">
        <span className="min-w-[50%]">TIME</span>
        <span>WINNER</span>
        <span className="min-w-[30%]">AMOUNT</span>
      </div>
      <div className="h-[300px] overflow-y-scroll text-center">
        {history.sort(h => h.timestamp).map(props => <HistoryItem {...props} />)}
      </div>
    </Modal>
  )
}
