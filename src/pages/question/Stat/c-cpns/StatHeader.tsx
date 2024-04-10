import React, { FC, useRef } from 'react'
import { Space, Button, Typography, Tooltip, Input, InputRef, Popover } from 'antd'
import QRCode from 'qrcode.react'
import styles from './StatHeader.module.scss'
import { CopyOutlined, LeftOutlined, QrcodeOutlined } from '@ant-design/icons'
import { useNavigate, useParams } from 'react-router-dom'
import useGetPageInfo from '@/hooks/useGetPageInfo'

const { Title } = Typography

const StatHeader: FC = (props) => {
  const nav = useNavigate()
  const { id } = useParams()

  const { title, isPublished } = useGetPageInfo()

  const urlInputRef = useRef<InputRef>()

  // 复制链接
  const copy = () => {
    const inputElem = urlInputRef.current
    if (inputElem === null) return

    inputElem.select() //选中内容
    document.execCommand('copy') //执行复制
  }

  // 生成链接和二维码
  const genLinkAndQRcodeElem = () => {
    // 如果没发布
    if (!isPublished) return null

    // 生成链接
    const url = `http://localhost:3001/question/${id}`

    const QRCodeElem = <QRCode value={url} size={150}></QRCode>

    return (
      <Space>
        <Input value={url} readOnly ref={urlInputRef} style={{ width: '300px' }}></Input>
        <Tooltip title="拷贝链接">
          <Button icon={<CopyOutlined />} onClick={copy}></Button>
        </Tooltip>
        <Popover content={QRCodeElem}>
          <Button icon={<QrcodeOutlined />}></Button>
        </Popover>
      </Space>
    )
  }

  return (
    <div className={styles['header-wrapper']}>
      <div className={styles.header}>
        <div className={styles.left}>
          <Space>
            <Button type="link" icon={<LeftOutlined />} onClick={() => nav(-1)}>
              返回
            </Button>
            <Title style={{ fontSize: '16px', marginBottom: '0' }}>{title}</Title>
          </Space>
        </div>
        <div className={styles.main}>{genLinkAndQRcodeElem()}</div>
        <div className={styles.right}>
          <Button type="primary" onClick={() => nav(`/question/edit/${id}`)}>
            编辑问卷
          </Button>
        </div>
      </div>
    </div>
  )
}

export default StatHeader
