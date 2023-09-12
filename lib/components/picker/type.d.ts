import { CSSProperties, ReactNode } from 'react'

export type PickerOption = {
  label: string
  value: number | string
}

export type PickerMode = 'single' | 'multiple'

export type PickerProps = {
  /**
   * 选择器标题
   */
  title?: string
  /**
   * 默认文本
   */
  placeholder?: string
  /**
   * 模式 ('single':单选, 'multiple':多选)
   */
  mode?: PickerMode
  /**
   * 数据选项
   */
  options: PickerOption[]
  /**
   * 自定义文本
   */
  text?: ReactNode
  /**
   * 文本样式
   */
  textStyle?: CSSProperties
  /**
   * 选中的值，多选时为数组
   */
  value?: (number | string)[] | number | string
  /**
   * 确认回调
   */
  onConfirm?: (value: (number | string)[] | number | string) => void
  /**
   * 是否开启搜索(默认开启)
   */
  search?: boolean
  /**
   * 搜索框默认文本
   */
  searchPlaceholder?: string
  /**
   * 容器样式
   */
  containerStyle?: CSSProperties
  /**
   * 取消文本
   */
  cancelText?: ReactNode
  /**
   * 确认文本
   */
  confirmText?: ReactNode
}
