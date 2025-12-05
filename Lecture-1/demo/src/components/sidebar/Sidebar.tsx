import { ClockIcon, UserGroupIcon } from '@heroicons/react/24/solid'

export enum SidebarModalState {
  History,
  Profiles,
}

export interface SidebarProps {
  setModalState: (m: SidebarModalState) => void;
}

export const Sidebar = ({ setModalState }: SidebarProps) => {
  const iconProps = {
    height: 24,
    color: 'white',
    className: 'cursor-pointer opacity-80 hover:opacity-100',
  }

  return (
    <div className="sidebar absolute top-1/2 right-0 z-90 flex flex-col p-2 gap-3">
      <ClockIcon onClick={() => setModalState(SidebarModalState.History)} {...iconProps} />
      <UserGroupIcon onClick={() => setModalState(SidebarModalState.Profiles)} {...iconProps} />
    </div>
  )
}
