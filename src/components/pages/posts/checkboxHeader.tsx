/* eslint-disable i18next/no-literal-string */

export function tagCheckboxHandler({
  checked,
  value,
}: {
  checked: boolean;
  value: string;
}) {
  return (old: string[]) => {
    if (checked) {
      return [...old, value];
    } else {
      return old.filter((tag) => tag !== value);
    }
  };
}

export function CheckboxHeader({
  handleCheckbox,
  filterMyPostsCB,
  tags,
  isFiltered,
}: {
  handleCheckbox: (args: { checked: boolean; value: string }) => void;
  filterMyPostsCB: (filter: boolean) => void;
  tags: string[];
  isFiltered: boolean;
}) {
  return (
    <>
      <ul className="flex gap-2">
        <div className="tabs py-6">
          <li className={`tab tab-bordered ${!isFiltered ? 'tab-active' : ''}`}>
            <span className="text-lg" onClick={() => filterMyPostsCB(false)}>
              Todos Posts
            </span>
          </li>
          <li className={`tab tab-bordered ${isFiltered ? 'tab-active' : ''}`}>
            <span className="text-lg" onClick={() => filterMyPostsCB(true)}>
              Meus Posts
            </span>
          </li>
        </div>
      </ul>
      <ul className="flex flex-col items-start justify-start gap-2 sm:flex-row sm:items-center">
        <p>Filtrar por tags: </p>
        <li>
          <label className="label cursor-pointer">
            <input
              type="checkbox"
              defaultChecked={tags.includes('furto')}
              className="checkbox mr-2 flex flex-1"
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
          <label className="label flex cursor-pointer">
            <input
              type="checkbox"
              defaultChecked={tags.includes('roubo')}
              className="checkbox mr-2 flex-1"
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
          <label className="label flex cursor-pointer">
            <input
              type="checkbox"
              defaultChecked={tags.includes('assédio')}
              className="checkbox mr-2 flex-1"
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
    </>
  );
}
