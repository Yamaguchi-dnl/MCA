"use client"

import * as React from "react"
import { format } from "date-fns"
import { ptBR } from 'date-fns/locale'
import { Calendar as CalendarIcon } from "lucide-react"
import type { ControllerRenderProps } from "react-hook-form"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

type DatePickerProps = {
    field: ControllerRenderProps<any, 'birthDate'>
}

export function DatePicker({ field }: DatePickerProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {field.value ? format(field.value, "PPP", { locale: ptBR }) : <span>Selecione a data</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={field.value}
          onSelect={field.onChange}
          locale={ptBR}
          captionLayout="dropdown-buttons"
          fromYear={new Date().getFullYear() - 18}
          toYear={new Date().getFullYear() - 2}
          disabled={(date) =>
            date > new Date() || date < new Date("1900-01-01")
          }
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}
