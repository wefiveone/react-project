import React, { FC, useEffect } from 'react'
import { Form, Input } from 'antd'
import useGetPageInfo from '@/hooks/useGetPageInfo'
import { useAppDispatch } from '@/store/hooks'
import { resetPageInfo } from '@/store/pageInfoReducer'

const { TextArea } = Input


const PageSetting: FC = () => {
  const pageInfo = useGetPageInfo()
  const [form] = Form.useForm()
  const dispatch = useAppDispatch()


  useEffect(() => {
    form.setFieldsValue(pageInfo)
  }, [pageInfo])

  const handleValuesChange = (_, allValues) => {
    console.log(allValues)
    dispatch(resetPageInfo(allValues))
  }

  return (
    <Form
      layout='vertical'
      initialValues={pageInfo}
      onValuesChange={handleValuesChange}
      form={form}
    >
      <Form.Item label='问卷标题' name='title' rules={[{ required: true, message: '请输入问卷标题' }]}>
        <Input />
      </Form.Item>
      <Form.Item label='问卷描述' name='desc'>
        <TextArea />
      </Form.Item>
      <Form.Item label='样式代码' name='css'>
        <TextArea placeholder='请输入 CSS 样式代码.....' />
      </Form.Item>
      <Form.Item label='问卷标题' name='js'>
        <TextArea placeholder='请输入 JS 脚本代码.....' />
      </Form.Item>
    </Form>
  )
}

export default PageSetting