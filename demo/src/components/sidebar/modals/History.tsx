import { Modal, type ModalProps } from "@components/Modal"
import { P1_SDK, P2_SDK } from "BreezSdk";
import { useEffect, useState } from "react"

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
  const [history, setHistory] = useState<HistoryItemProps[]>([]);

  const calculateHistory = async () => {
    if (!P1_SDK || !P2_SDK) return;

    const p1History = await P1_SDK.listPayments({})
    const p1TxIds = p1History.map((p) => p.txId).filter(p => p !== undefined)
    const p2History = await P2_SDK.listPayments({})
    const p2TxIds = p2History.map((p) => p.txId).filter(p => p !== undefined)

    const history: Record<string, HistoryItemProps> = {}
    p1History.forEach((payment1) => {
      const txid = payment1?.txId;
      if (!txid) return;
      if (p2TxIds.includes(txid)) {
        const isWinner = payment1.paymentType == 'receive';
        history[txid] = {
          winner: isWinner ? 'P1' : 'P2',
          timestamp: payment1.timestamp,
          amountWon: payment1.amountSat,
        }
      }
    })
    p2History.forEach((payment2) => {
      const txid = payment2?.txId;
      if (!txid) return;
      if (p1TxIds.includes(txid)) {
        const isWinner = payment2.paymentType == 'receive';
        history[txid] = {
          winner: isWinner ? 'P1' : 'P2',
          timestamp: payment2.timestamp,
          amountWon: payment2.amountSat,
        }
      }
    })
    setHistory(Object.values(history))
  }

  useEffect(() => {
    setTimeout(() => calculateHistory(), 2000);
  }, [])

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
