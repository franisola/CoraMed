import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './store';

// Custom hook tipado para dispatch
export const useAppDispatch: () => AppDispatch = useDispatch;

// Custom hook tipado para selector
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
