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
import { Input } from '../ui/input'
import { useConfig } from '@/common/context/config_provider'
const FormSchema = z.object({
  device_id: z.string({
    required_error: '请选择摄像头.'
  }),
  user: z.string().min(2, {
    message: '请输入'
  })
})

interface IProps {
  settings: (val: { deviceId: string; title: string }) => void
}
const Settings: FC<IProps> = ({ settings }): ReactNode => {
  const { title } = useConfig()
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      device_id: 'm@google.com',
      user: title
    }
  })

  const onSubmit = (data: z.infer<typeof FormSchema>): void => {
    console.log(data)
    const { device_id, user } = data
    settings({ deviceId: device_id, title: user })
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
                <Select onValueChange={field.onChange} value="m@google.com">
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a verified email to display" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="m@example.com">m@example.com</SelectItem>
                    <SelectItem value="m@google.com">m@google.com</SelectItem>
                    <SelectItem value="m@support.com">m@support.com</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
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
          />
          <Button type="submit">确定</Button>
        </form>
      </Form>
      {/* <Button>确定</Button> */}
    </div>
  )
}

export default Settings
