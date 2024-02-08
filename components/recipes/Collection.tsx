import { CollectionProps } from "@/types";
import Card from "./Card";
import Pagination from "./Pagination";

const Collection = ({
  data,
  emptyTitle,
  emptyStateSubtext,
  page,
  totalPages = 0,
  collectionType,
  urlParamName,
}: CollectionProps) => {
  return (
    <>
      {data.length > 0 ? (
        <div className="flex flex-col items-center gap-10">
          <ul className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:gap-10">
            {data.map((recipe) => {
              return (
                <li key={recipe._id} className="flex justify-center">
                  <Card recipe={recipe} />
                </li>
              );
            })}
          </ul>

          {totalPages > 1 && (
            <Pagination
              urlParamName={urlParamName}
              page={page}
              totalPages={totalPages}
            />
          )}
        </div>
      ) : (
        <div className="flex items-center justify-center wrapper min-h-[200px] w-full flex-col gap-3 rounded-lg bg-gradient-to-tr from-slate-800 to-slate-700 text-white py-28 text-center">
          <h3 className="font-semibold text-xl">{emptyTitle}</h3>
          <p className="text-slate-200">{emptyStateSubtext}</p>
        </div>
      )}
    </>
  );
};

export default Collection;
