/* eslint-disable i18next/no-literal-string */
import { Fragment, useEffect, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';

import { tagCheckboxHandler } from './checkboxHeader';

export function MutationPostModal({
  title,
  openModal,
  callback,
  onClose,
  description: initialDescription,
  tags: initialTags,
}: {
  title: string;
  openModal: boolean;
  callback: ({
    description,
    tags,
  }: {
    description: string;
    tags: string[];
  }) => void;
  onClose: () => void;
  description: string;
  tags: string[];
}) {
  const [tags, setTags] = useState(initialTags);
  const [description, setDescription] = useState(initialDescription);

  useEffect(() => {
    setDescription(initialDescription);
  }, [initialDescription]);

  useEffect(() => {
    setTags(initialTags);
  }, [initialTags]);

  const handleCheckbox = (args: { checked: boolean; value: string }) =>
    setTags((old) => tagCheckboxHandler(args)(old));

  return (
    <Transition appear show={openModal} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="card card-bordered w-full max-w-md transform overflow-hidden bg-neutral p-6 text-left align-middle text-neutral-content shadow-xl transition-all">
                <div className="card-body">
                  <Dialog.Title as="h3" className="card-title">
                    {title}
                  </Dialog.Title>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      if (description.trim().length > 0) {
                        callback({
                          description,
                          tags: Array.from(new Set(tags)),
                        });
                      }
                    }}
                  >
                    <ul className="flex gap-2">
                      <li>
                        <label className="label cursor-pointer">
                          <input
                            type="checkbox"
                            defaultChecked={tags.includes('furto')}
                            className="checkbox mr-2"
                            onClick={(e) =>
                              handleCheckbox({
                                checked: e.target?.checked,
                                value: 'furto',
                              })
                            }
                          />
                          <span className="label-text">Furto</span>
                        </label>
                      </li>
                      <li>
                        <label className="label cursor-pointer">
                          <input
                            type="checkbox"
                            defaultChecked={tags.includes('roubo')}
                            className="checkbox mr-2"
                            onClick={(e) =>
                              handleCheckbox({
                                checked: e.target?.checked,
                                value: 'roubo',
                              })
                            }
                          />
                          <span className="label-text">Roubo</span>
                        </label>
                      </li>
                      <li>
                        <label className="label cursor-pointer">
                          <input
                            type="checkbox"
                            defaultChecked={tags.includes('assédio')}
                            className="checkbox mr-2"
                            onClick={(e) =>
                              handleCheckbox({
                                checked: e.target?.checked,
                                value: 'assédio',
                              })
                            }
                          />
                          <span className="label-text">Assédio</span>
                        </label>
                      </li>
                    </ul>
                    <textarea
                      placeholder="Digite algo..."
                      className="textarea textarea-bordered w-full rounded bg-neutral px-2 py-1 text-center text-lg text-neutral-content"
                      name="description"
                      onChange={({ target }) => setDescription(target.value)}
                      rows={5}
                      cols={50}
                      value={description}
                    />
                    <div className="card-actions mt-4">
                      <input
                        disabled={description.trim().length === 0}
                        className="btn btn-primary"
                        type="submit"
                      />
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={onClose}
                      >
                        Fechar
                      </button>
                    </div>
                  </form>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
