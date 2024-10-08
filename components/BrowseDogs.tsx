"use client";

import { useEffect, useState } from "react";

import DogCard from "./DogCard";
import FilterBreeds from "./FilterBreeds";
import ModifySort from "./ModifySort";
import Paginate from "./Paginate";
import withAuth from "./ProtectedRoute";
import { useGlobalState } from "../context/GlobalStateContext";
import { Dog } from "../types/interfaces";
import getBreedData from "../utils/getBreedData";
import getDogs from "../utils/getDogs";

function BrowseDogs() {
  const { availableDogs, setAvailableDogs } = useGlobalState();
  const [filteredBreeds, setFilteredBreeds] = useState<Dog[]>(availableDogs);
  const [selectedBreed, setSelectedBreed] = useState<string>("");
  const [sortType, setSortType] = useState<string>("asc");
  const [refetchTrigger, setRefetchTrigger] = useState(0);
  const [paginationInfo, setPaginationInfo] = useState({
    prev: "",
    next: "",
  });

  // Fetch all dogs based on sort type
  const getAvailableDogs = async () => {
    try {
      const { dogsData, searchResponse } = await getDogs(sortType);
      setAvailableDogs(dogsData);
      setFilteredBreeds(dogsData);
      setSelectedBreed("all");
      setPaginationInfo({
        prev: searchResponse.prev,
        next: searchResponse.next,
      });
    } catch (error) {
      console.error("Error fetching dogs:", error);
    }
  };

  // Fetch dogs based on selected breed
  const getBreedInfo = async () => {
    try {
      const { dogsData, searchData } = await getBreedData(selectedBreed);
      setFilteredBreeds(dogsData);
      setPaginationInfo({
        prev: searchData.prev,
        next: searchData.next,
      });
    } catch (error) {
      console.error("Error fetching breed data:", error);
    }
  };

  useEffect(() => {
    getAvailableDogs();
  }, [setAvailableDogs, sortType, refetchTrigger]);

  useEffect(() => {
    if (selectedBreed && selectedBreed !== "all") {
      getBreedInfo();
    }

    if (selectedBreed === "all") {
      setFilteredBreeds(availableDogs);
    }
  }, [selectedBreed]);

  useEffect(() => {
    setAvailableDogs(filteredBreeds);
  }, [filteredBreeds]);

  return (
    <div>
      <h1 className="text-2xl font-bold text-center mb-10">Our Awesome Dogs</h1>
      <div className="flex flex-col md:flex-row justify-center items-center gap-5 mb-5">
        <div className="flex flex-col items-center justify-center gap-2">
          <p>Filter</p>
          <FilterBreeds
            setSelectedBreed={setSelectedBreed}
            selectedBreed={selectedBreed}
          />
        </div>
        <ModifySort
          setSortType={setSortType}
          triggerRefetch={() => setRefetchTrigger((prev) => prev + 1)}
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredBreeds.length > 0
          ? filteredBreeds.map((dog, index) => (
              <DogCard linkToBreed={true} dog={dog} key={index} />
            ))
          : null}
      </div>
      <Paginate
        paginationInfo={paginationInfo}
        sortType={sortType}
        setFilteredBreeds={setFilteredBreeds}
        setPaginationInfo={setPaginationInfo}
      />
    </div>
  );
}

export default withAuth(BrowseDogs);
