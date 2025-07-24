import { useDispatch, useSelector } from "react-redux";
import { setSpecies, setGender } from "../state/global";

export function useGlobalSpeciesGender() {
  const dispatch = useDispatch();
  const species = useSelector((state) => state.global.species);
  const gender = useSelector((state) => state.global.gender);

  const handleSetSpecies = (event, value) => {
    if (value !== null) dispatch(setSpecies(value));
  };

  const handleSetGender = (event, value) => {
    if (value !== null) dispatch(setGender(value));
  };

  return {
    species,
    gender,
    handleSetSpecies,
    handleSetGender,
  };
}
