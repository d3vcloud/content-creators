import { useEffect, useState } from 'react'
import { GetStaticPaths } from 'next'
import { useRouter } from 'next/router'
import Head from 'next/head'

import { api } from 'data/api'
import { LIST_CATEGORIES } from 'data/categories'

import { Category, Creator } from 'types'

import HeaderTitle from 'components/header-title'
import Layout from 'components/layout'
import { HomeIc } from 'components/icons'
import CustomLink from 'components/custom-link'
import ListCategory from 'components/list-category'
import CategoryDetail from 'components/category-detail'
import Placeholder from 'components/placeholder'

const DashboardCategory = ({ data }: any) => {
  const [creators, setCreators] = useState<Creator[]>(data)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const router = useRouter()
  const { id, q } = router.query
  const title = id ? `Dashboard: ${id} 🚀` : 'Loading...'

  useEffect(() => {
    if (!q) return

    const getData = async () => {
      const data = await api.search(id as string, q as string)
      console.log(data)
      setCreators(data)
      setIsLoading(false)
    }
    getData()
  }, [q]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!q) {
      console.log('Fetching all data')
      setCreators(data)
      setIsLoading(false)
    }
  }, [id]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Layout>
        <div className='flex flex-row gap-2 items-center mb-12'>
          <CustomLink href='/'>
            <HomeIc className='h-8 w-8 lg:h-12 lg:w-12 text-white' />
          </CustomLink>
          <HeaderTitle msg={id as string} />
        </div>
        <div className='flex flex-col gap-4'>
          {/* Tecnologías slider */}
          <ListCategory listCategories={LIST_CATEGORIES} />
          {isLoading ? (
            <Placeholder length={4} />
          ) : (
            <CategoryDetail categoryId={id as Category} data={creators} />
          )}
        </div>
      </Layout>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = LIST_CATEGORIES.map((category) => ({ params: { id: category.id } }))
  console.log(paths)
  return {
    paths: paths,
    fallback: false // can also be true or 'blocking'
  }
}

export const getStaticProps = async ({ params }: any) => {
  const { id } = params
  const data = await api.search(id)

  return {
    props: {
      data
    }
  }
}

export default DashboardCategory
