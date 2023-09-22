import React, { createContext, useReducer } from 'react';

type ModalItem = React.ReactNode;

type GlobalModalState = {
  modals: Map<string, ModalItem>;
};

type AddModalType = {
  id: string;
  modal: ModalItem;
};

type RemoveModalType = {
  id: string;
};

type GlobalModalContextType = {
  state: GlobalModalState;
  addModal: (payload: AddModalType) => void;
  removeModal: (payload: RemoveModalType) => void;
};

const initialState: GlobalModalState = {
  modals: new Map<string, ModalItem>(),
};

const GlobalModalContext = createContext<GlobalModalContextType>({
  state: initialState,
  addModal: () => {},
  removeModal: () => {},
});

type Action = {
  type: 'ADD_MODAL' | 'REMOVE_MODAL';
  payload: AddModalType | RemoveModalType;
};

const reducer = (state: GlobalModalState, action: Action) => {
  const { type, payload } = action;
  const modals = new Map(state.modals);

  switch (type) {
    case 'ADD_MODAL': {
      const { id, modal } = payload as AddModalType;
      modals.set(id, modal);
      return { modals };
    }
    case 'REMOVE_MODAL': {
      const { id } = payload as RemoveModalType;
      modals.delete(id);
      return { modals };
    }
    default:
      return state;
  }
};

const GlobalModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const addModal = (payload: AddModalType) => {
    dispatch({ type: 'ADD_MODAL', payload });
  };

  const removeModal = (payload: RemoveModalType) => {
    dispatch({ type: 'REMOVE_MODAL', payload });
  };

  return <GlobalModalContext.Provider value={{ state, addModal, removeModal }}>{children}</GlobalModalContext.Provider>;
};

export { GlobalModalContext, GlobalModalProvider };
