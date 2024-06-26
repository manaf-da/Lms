import React, {FC} from 'react'
import {
    Dialog,
    DialogTrigger,
  } from "@/components/ui/dialog"

type Props = {
    open: boolean
    setOpen: (value: boolean) => void
    activeItem:any
    component:any
    setRoute? : (route: string) => void
}

const CustomModal : FC<Props> = ({open,setOpen,setRoute,component:Component}) =>{
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Component setOpen={setOpen} setRoute={setRoute}/>
      </DialogTrigger>    
    </Dialog>
  )
}


export default CustomModal