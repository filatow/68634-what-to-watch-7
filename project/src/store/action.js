export const ActionType = {
  SET_FILTER_CATEGORY: 'set-filter-category',
};

export const ActionCreator = {
  setFilterCategory: (FilterCategory) => ({
    type: ActionType.SET_FILTER_CATEGORY,
    payload: FilterCategory,
  }),
};
