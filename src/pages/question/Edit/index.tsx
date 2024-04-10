import React, { FC } from 'react'
import useLoadOneQuestionData from '../../../hooks/useLoadQuestionData'
import styles from './index.module.scss'
import EditCanvas from './c-cpns/EditCanvas'
import { useAppDispatch } from '../../../store/hooks'
import { changeSelectedId } from '../../../store/componentListReducer'
import LeftPanel from './c-cpns/LeftPanel'
import RightPanel from './c-cpns/RightPanel'
import EditHeader from './c-cpns/EditHeader'
import { useTitle } from 'ahooks'
import useGetPageInfo from '@/hooks/useGetPageInfo'

const Edit: FC = () => {
  const { loading } = useLoadOneQuestionData()
  const dispatch = useAppDispatch()

  // 修改标题
  const { title } = useGetPageInfo()
  useTitle(`编辑问卷-${title}`)

  const clearSelectedId = () => {
    dispatch(changeSelectedId(''))
  }

  return (
    <div className={styles.container}>
      <EditHeader />
      <div className={styles['content-wrapper']}>
        <div className={styles.content}>
          <div className={styles.left}>
            <LeftPanel />
          </div>
          <div className={styles.main} onClick={clearSelectedId}>
            <div className={styles['canvas-wrapper']}>
              <EditCanvas loading={loading} />
            </div>
          </div>
          <div className={styles.right}>
            <RightPanel/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Edit
