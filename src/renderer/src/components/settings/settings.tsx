import { FC, ReactNode } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '../ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
// import { Input } from '../ui/input'
import { useConfig } from '@/common/context/config_provider'
const FormSchema = z.object({
  device_id: z.string({
    required_error: '请选择摄像头.'
  })
  // user: z.string().min(2, {
  //   message: '请输入'
  // })
})

interface IProps {
  settings: (val: { deviceId: string }) => void
}
const Settings: FC<IProps> = ({ settings }): ReactNode => {
  const { devices, devicesId } = useConfig()
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      device_id: devicesId
      // user: title
    }
  })

  const onSubmit = (data: z.infer<typeof FormSchema>): void => {
    const { device_id } = data
    settings({ deviceId: device_id })
  }
  return (
    <div className=" w-screen h-screen bg-slate-400 flex flex-col p-5">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-6">
          <FormField
            control={form.control}
            name="device_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel className=" text-white">选择摄像头</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={devicesId}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="请选择一个摄像头" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {devices.map((i) => (
                      <SelectItem value={i.deviceId} key={i.deviceId}>
                        {i.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* <FormField
            control={form.control}
            name="user"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="shadcn" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          /> */}
          <Button type="submit">确定</Button>
        </form>
      </Form>
      {/* <Button>确定</Button> */}
    </div>
  )
}

export default Settings
