import React, { lazy } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout'
import ManageLayout from '../layouts/ManageLayout'
import QuestionLayout from '../layouts/QuestionLayout'
import Home from '../pages/Home'
import Login from '../pages/Login'
import Register from '../pages/Register'
import NotFound from '../pages/NotFound'
import List from '../pages/manage/List'
import Star from '../pages/manage/Star'
import Trash from '../pages/manage/Trash'
// import Edit from '../pages/question/Edit'
// import Stat from '../pages/question/Stat'

// 路由懒加载
const Edit = lazy(() => import(/*webpackChunkName: 'editPage'*/'../pages/question/Edit'))
const Stat = lazy(() => import(/*webpackChunkName: 'statPage'*/'../pages/question/Stat'))


const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/register',
        element: <Register />
      },
      {
        path: '/manage',
        element: <ManageLayout />,
        children: [
          {
            path: '/manage/list',
            element: <List />
          },
          {
            path: '/manage/star',
            element: <Star />
          },
          {
            path: '/manage/trash',
            element: <Trash />
          }
        ]
      },
      {
        path: '*',
        element: <NotFound />
      }
    ]
  },
  {
    path: '/question',
    element: <QuestionLayout />,
    children: [
      {
        path: '/question/edit/:id',
        element: <Edit />
      },
      {
        path: '/question/stat/:id',
        element: <Stat />
      }
    ]
  }
])

export default router


export const LOGIN_PATHNAME = '/login'
export const REGISTER_PATHNAME = '/register'
export const HOME_PATHNAME = '/'
export const MANAGE_INDEX_PATHNAME = '/manage/list'