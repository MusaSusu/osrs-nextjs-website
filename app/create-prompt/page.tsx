'use client'

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import { Form, FormProps} from '@components/Form';

export interface PostState{
    prompt: string,
    tag: string
}

const CreatePrompt = () => {
    const { data: session } = useSession();
    const [submitting, setSubmitting] = useState(false);
    const [post, setPost] = useState<PostState>({
        prompt: "",
        tag: " ",
    });

    const createPrompt = async (e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        setSubmitting(true);
        console.log(session?.user.id)
        try {
            const response = await fetch("/api/prompt/new", {
              method: "POST",
              body: JSON.stringify({
                prompt: post.prompt,
                userId: session?.user.id,
                tag: post.tag,
              }),
            });
            if (response.ok) {
            }
          } catch (error) {
            console.log(error);
          } finally {
            setSubmitting(false);
          }
    }

    return (
        <Form
        type = "Create"
        post = {post}
        setPost = {setPost}
        submitting = {submitting}
        handleSubmit = {createPrompt}
        />
    )
}

export default CreatePrompt