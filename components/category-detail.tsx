import { useState } from 'react'

import type { Category, Creator } from 'types'

import NoDataFound from './no-data-found'
import FormSearch from './form-search'
import ListCreator from './list-creator'

type PropsCategoryDetail = {
  categoryId: Category
  data: Creator[]
}

const CategoryDetail = ({ categoryId, data }: PropsCategoryDetail) => {
  const [isSearching, setIsSearching] = useState<boolean>(false)
  const [query, setQuery] = useState<string>('')

  return (
    <>
      {(data.length > 0 || isSearching) && (
        <FormSearch nameClass='mb-8' setIsSearching={setIsSearching} setQuery={setQuery} />
      )}
      {data.length > 0 ? (
        <ListCreator listCreators={data} />
      ) : (
        <NoDataFound
          message='No se encontraron resultados para'
          keyword={isSearching ? query : categoryId}
        />
      )}
    </>
  )
}

export default CategoryDetail
