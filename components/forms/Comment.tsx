'use client';

import { useForm } from 'react-hook-form';
import Image from "next/image"
import { usePathname } from 'next/navigation';

import * as z from 'zod';
import { useOrganization } from '@clerk/nextjs';
import { zodResolver } from '@hookform/resolvers/zod';

import { addCommentToThread } from '@/lib/actions/thread.actions';
import { CommentValidation } from '@/lib/validations/thread';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

interface Props {
  threadId: string;
  currentUserImg: string;
  currentUserId: string;
}

const Comment = ({ threadId, currentUserImg, currentUserId }: Props) => {
  const pathname = usePathname();

  const { organization } = useOrganization();
  const form = useForm<z.infer<typeof CommentValidation>>({
    resolver: zodResolver(CommentValidation),
    defaultValues: {
      thread: ''
    },
  });

  async function onSubmit(values: z.infer<typeof CommentValidation>) {
    await addCommentToThread(
        threadId,
        values.thread,
        JSON.parse(currentUserId),
        pathname
    );
    form.reset();
  }

  return (
    <Form {...form}>
      <form className="comment-form" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="thread"
          render={({ field }) => (
            <FormItem className="flex w-full items-center gap-3">
              <FormLabel>
                  <Image
                      src={currentUserImg}
                      alt="current_user"
                      width={48}
                      height={48}
                      className="rounded-full object-cover"
                  />
              </FormLabel>
              <FormControl className="border-none bg-transparent">
                <Input
                    type="text"
                    placeholder="Comment..."
                    className="no-focus text-light-1 outline-none"
                    {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <Button type="submit" className="comment-form_btn">
          Reply
        </Button>
      </form>
    </Form>
  );
};

export default Comment;
