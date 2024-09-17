import React from "react";

import { Button } from "./ui/button";

interface ModifySortProps {
  setSortType: (sortType: string) => void;
  triggerRefetch: () => void;
}

function ModifySort({ setSortType, triggerRefetch }: ModifySortProps) {
  const handleSortChange = (newSortType: string) => {
    setSortType(newSortType);

    // ensures breeds can be refetched regardless of current sort
    triggerRefetch();
  };

  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <div>
        <p>Sort By Breed:</p>
      </div>
      <div className="flex gap-2">
        <Button
          variant="outline"
          className="bg-white"
          onClick={() => handleSortChange("asc")}
        >
          Asc
        </Button>
        <Button
          variant="outline"
          className="bg-white"
          onClick={() => handleSortChange("desc")}
        >
          Desc
        </Button>
      </div>
    </div>
  );
}

export default ModifySort;
