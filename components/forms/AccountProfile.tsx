'use client';

import { ChangeEvent, useState } from 'react';
import { useForm } from 'react-hook-form';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';

import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

import { UserValidation } from '@/lib/validations/user';

interface Props {
  user: {
    id: string;
    objectId: string;
    username: string;
    name: string;
    bio: string;
    image: string;
  };
  btnTitle: string;
}

const AccountProfile = ({ user, btnTitle }: Props) => {
  const router = useRouter();
  const pathname = usePathname();

  const [files, setFiles] = useState<File[]>([]);

  const form = useForm({
    resolver: zodResolver(UserValidation),
    defaultValues: {
      profile_photo: user?.image ? user.image : '',
      name: user?.name ? user.name : '',
      username: user?.username ? user.username : '',
      bio: user?.bio ? user.bio : '',
    },
  });
  function handleImage(e: ChangeEvent<HTMLInputElement>, fieldChange: (value: string) => void) {
    e.preventDefault();
  }
  function onSubmit(values: z.infer<typeof UserValidation>) {
    console.log(values);
  }
  return (
    <Form {...form}>
      <form className="flex flex-col justify-start gap-10" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="profile_photo"
          render={({ field }) => (
            <FormItem className="flex items-center gap-4">
              <FormLabel className="account-form_image-label">
                {field.value ? (
                  <Image
                    src={field.value}
                    alt="profile_icon"
                    width={96}
                    height={96}
                    priority
                    className="rounded-full object-contain"
                  />
                ) : (
                  <Image
                    src="/assets/profile.svg"
                    alt="profile_icon"
                    width={24}
                    height={24}
                    className="object-contain"
                  />
                )}
              </FormLabel>
              <FormControl className="flex-1 text-base-semibold text-gray-200">
                <Input
                  type="file"
                  accept="image/*"
                  placeholder="Add profile photo"
                  className="account-form_image-input"
                  onChange={e => handleImage(e, field.onChange)}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col gap-3">
              <FormLabel className="text-base-smeibold text-light-2">Name</FormLabel>
              <FormControl>
                <Input type="text" className="account-form_input no-focus" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col gap-3">
              <FormLabel className="text-base-semibold text-light-2">Username</FormLabel>
              <FormControl>
                <Input className="account-form_input no-focus" type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col gap-3">
              <FormLabel className="text-base-semibold text-light-2">Bio</FormLabel>
              <FormControl>
                <Textarea className="account-form_input no-focus" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit' className='bg-primary-500'>
          {btnTitle}
        </Button>
      </form>
    </Form>
  );
};

export default AccountProfile;
