import { useEffect, useState } from 'react'
import { Popup, SearchBar, Footer, ErrorBlock } from 'antd-mobile'
import { CheckOutline } from 'antd-mobile-icons'

import { CSSProperties, ReactNode } from 'react'

export type PickerOption = {
  label: string
  value: number | string
}

export type PickerMode = 'single' | 'multiple'

export type PickerProps = {
  title?: string
  placeholder?: string
  mode?: PickerMode
  options: PickerOption[]
  text?: ReactNode
  textStyle?: CSSProperties
  value?: (number | string)[] | number | string
  onConfirm?: (value: (number | string)[] | number | string) => void
  search?: boolean
  searchPlaceholder?: string
  containerStyle?: CSSProperties
  cancelText?: ReactNode
  confirmText?: ReactNode
  noMoreText?: ReactNode
}

export const UniversalPicker = ({
  search = true,
  searchPlaceholder,
  mode,
  text,
  textStyle,
  value,
  onConfirm,
  title,
  placeholder = 'Click to select',
  options,
  containerStyle,
  cancelText,
  confirmText,
  noMoreText
}: PickerProps) => {
  const [selectedValue, setSelectedValue] = useState<(number | string)[]>([])
  const [filteredOptions, setFilteredOptions] = useState<PickerOption[]>([])
  const [searchValue, setSearchValue] = useState<string | undefined>()
  const [visible, setVisible] = useState<boolean>(false)

  useEffect(() => {
    setFilteredOptions(options)
  }, [options])

  useEffect(() => {
    if (value) {
      if (value instanceof Array) {
        setSelectedValue(value)
      } else {
        setSelectedValue([value])
      }
    } else {
      setSelectedValue([])
    }
  }, [value])

  const handleSelectItem = (item: PickerOption) => {
    const newSelectedValue = [...selectedValue]
    const index = newSelectedValue.findIndex((s) => s === item.value)
    if (mode === 'multiple') {
      if (newSelectedValue && index > -1) {
        newSelectedValue.splice(index, 1)
      } else {
        newSelectedValue.push(item.value)
      }
      setSelectedValue([...newSelectedValue])
    } else {
      setSelectedValue(selectedValue && selectedValue[0] === item.value ? [] : [item.value])
    }
  }

  const handleOnConfirm = () => {
    selectedValue && onConfirm && onConfirm(mode === 'multiple' ? selectedValue : selectedValue[0])
    setSearchValue('')
    setVisible(false)
  }

  const handleCancel = () => {
    setSearchValue('')
    setSelectedValue([])
    setVisible(false)
  }

  const handleOnSearch = (value: string) => {
    setFilteredOptions(
      options.filter((item) => {
        return item.label?.includes(value)
      })
    )
    setSearchValue(value)
  }

  const handleOnClear = () => {
    setFilteredOptions(options)
    setSearchValue('')
  }

  const handleGetText = () => {
    if (text) {
      return text
    } else {
      if (value) {
        // 表示有值
        if (value instanceof Array) {
          return (
            options
              .filter((data) => value.includes(data.value))
              .map((s) => s.label)
              .join('、') || placeholder
          )
        } else {
          return options.find((data) => data.value === value)?.label || placeholder
        }
      } else {
        return placeholder
      }
    }
  }
  return (
    <>
      <span
        className={selectedValue.length === 0 ? 'd-placeholder' : undefined}
        style={textStyle ? { ...textStyle } : undefined}
        onClick={() => {
          setVisible(true)
        }}
      >
        {handleGetText()}
      </span>
      <Popup
        visible={visible}
        onMaskClick={() => {
          setVisible(false)
        }}
      >
        <div className="d-picker" style={containerStyle}>
          <div className="d-picker-header">
            <div onClick={handleCancel} className="d-picker-button">
              {cancelText || 'cancel'}
            </div>
            {!!title && <div className="d-picker-title">{title}</div>}
            <div onClick={handleOnConfirm} className="d-picker-button">
              {confirmText || 'confirm'}
            </div>
          </div>
          {search && (
            <div className="d-picker-search">
              <SearchBar
                value={searchValue}
                onSearch={handleOnSearch}
                onChange={handleOnSearch}
                onClear={handleOnClear}
                placeholder={searchPlaceholder}
              />
            </div>
          )}
          <div className="d-picker-list">
            {!filteredOptions?.length ? (
              <ErrorBlock description="no" />
            ) : (
              <>
                {filteredOptions?.map((item) => {
                  return (
                    <div
                      style={{
                        backgroundColor:
                          selectedValue && selectedValue.findIndex((s) => s === item.value) > -1
                            ? 'rgba(0,0,0,0.04)'
                            : undefined
                      }}
                      className="d-picker-item"
                      onClick={() => handleSelectItem(item)}
                      key={item.value}
                    >
                      <span>{item.label}</span>
                      <div>
                        {selectedValue && selectedValue.find((s) => s === item.value) && (
                          <CheckOutline style={{ fontSize: '1.5rem' }} color="#1677ff" />
                        )}
                      </div>
                    </div>
                  )
                })}
                {filteredOptions.length > 10 && <Footer label={noMoreText || "There's no more."} />}
              </>
            )}
          </div>
        </div>
      </Popup>
    </>
  )
}
