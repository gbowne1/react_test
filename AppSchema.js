export default [
    {
      key: 'id',
      type: 'number',
      optional: true // when the user inputs a todo and we first validate it, it has no ID
    }, {
      key: 'title',
      type: 'string'
    }, {
      key: 'description',
      type: 'string'
    }, {
      key: 'category',
      type: 'string',
      otherCondition: (val) => ['Home', 'Work', 'School', 'Personal'].includes(val),
      otherConditionMessage: 'Category must be Home, Work, School, or Personal.'
    }
  ]