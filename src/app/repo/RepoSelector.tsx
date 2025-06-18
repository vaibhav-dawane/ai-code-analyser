'use client'
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react'
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/20/solid'
import clsx from 'clsx'
import { useState } from 'react'
import { useSession } from "next-auth/react";
import { Code2, LoaderCircle } from 'lucide-react';
import { Toaster, toast } from 'sonner';
import { useRouter } from 'next/navigation';
import Link from 'next/link'

export default function RepoSelector({ repoNames }: { repoNames: string[] }) {
    const [selected, setSelected] = useState("Choose a repo")
    const { data: session } = useSession();

    const repoToken = session?.accessToken as string;
    const repoOwner = session?.username as string;

    const [loading, setLoading] = useState(false);

    const router = useRouter();

    const analyseRepo = async () => {

        if (selected === "Choose a repo") {
            toast.error("Select a Correct Repository!");
            return;
        }
        setLoading(true);
        const data = {
            repoToken, repoOwner, selected
        }
        // console.log("Selected Repo is: ", selected);

        try {
            const cloneRepo = await fetch('/api/cloneRepo', {
                method: 'POST',
                body: JSON.stringify(data)
            })
            // console.log("Response after Cloning Repo: ", cloneRepo);

            if (cloneRepo.ok) {

                const res = await fetch('/api/chat', {
                    method: 'POST',
                    body: JSON.stringify(data)
                })

                const results = await res.json();

                if (results.response) {
                    results.repoName = selected;
                    await fetch('/api/saveIssues', {
                        method: 'POST',
                        body: JSON.stringify(results)
                    })
                }
                toast.success("Repository Analysed Successfully");
                router.push(`/${repoOwner}/${selected}/codeSuggestion`);
            }
        } catch (error) {
            console.error("Repo Clone Failed", error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className='w-full h-screen relative flex flex-col justify-center items-center'>
            <Link href='/'>
                <div className="absolute left-6 md:left-10 top-4 md:top-6 flex items-center cursor-pointer select-none">
                    <Code2 className="w-5 md:w-6 h-5 md:h-6 text-blue-500" />
                    <span className="ml-2 bg-gradient-to-r from-blue-500 to-purple-600 text-transparent bg-clip-text font-semibold text-sm md:text-xl">AI CommitIQ</span>
                </div>
            </Link>
            <Toaster />
            <div className='flex md:flex-row flex-col items-center justify-center'>
                <div className='md:w-36 w-34 text-sm md:text-md text-center md:text-left'>
                    Select a Repository
                </div>
                <div className="ml-4 md:w-64 w-52 mt-4 md:mt-0">
                    <Listbox value={selected} onChange={setSelected}>
                        <ListboxButton
                            className={clsx(
                                'relative block w-full rounded-lg bg-white/5 py-1.5 pr-8 pl-3 text-left text-sm/6 text-white',
                                'focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-white/25'
                            )}
                        >
                            {selected}
                            <ChevronDownIcon
                                className="group pointer-events-none absolute top-2.5 right-2.5 size-4 fill-white/60"
                                aria-hidden="true"
                            />
                        </ListboxButton>
                        <ListboxOptions
                            anchor="bottom"
                            transition
                            className={clsx(
                                'w-64 h-56 rounded-xl border border-white/5 bg-black p-1 [--anchor-gap:--spacing(1)] focus:outline-none',
                                'transition duration-100 ease-in data-leave:data-closed:opacity-0'
                            )}
                        >
                            {repoNames.map((repo, index) => (
                                <ListboxOption
                                    key={index}
                                    value={repo}
                                    className="group flex cursor-pointer items-center gap-2 rounded-lg px-3 py-1.5 select-none data-focus:bg-white/10"
                                >
                                    <CheckIcon className="invisible size-4 fill-white group-data-selected:visible" />
                                    <div className="text-sm/6 text-white">{repo}</div>
                                </ListboxOption>
                            ))}
                        </ListboxOptions>
                    </Listbox>
                </div>
            </div>

            <div className='flex mt-6 p-1 md:p-2 px-2 md:px-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-md border border-blue-500 cursor-pointer transform duration-200 hover:scale-105 text-sm md:text-lg' onClick={analyseRepo}>
                Start Analysing
                {
                    loading && (
                        <span className='ml-2'>
                            <LoaderCircle className='transition-all duration-200 animate-spin' />
                        </span>
                    )
                }
            </div>
        </div>
    )
}