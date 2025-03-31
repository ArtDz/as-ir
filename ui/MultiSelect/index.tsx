'use client'

import React from 'react'
import ReactSelect, { ActionMeta, MultiValue } from 'react-select'
import makeAnimated from 'react-select/animated'

import { SelectOption } from '@/ui/MultiSelect/select.constant'

const animatedComponents = makeAnimated()

interface Props {
  onChange: (value: SelectOption[]) => void
  value: SelectOption[]
  options: readonly SelectOption[]
}

const MultiSelect = ({ value, onChange, options }: Props) => {
  return (
    <ReactSelect
      closeMenuOnSelect={false}
      components={animatedComponents}
      isMulti
      classNames={{
        control: ({ isFocused }) =>
          `!background-light700_dark300 !border-dark-300 rounded-lg p-2 ${isFocused ? '!border-primary-500' : ''}`,
        menu: () => '!bg-dark-500 !text-light-900 rounded-lg shadow-lg',
        menuList: () => 'p-2',
        option: ({ isSelected, isFocused }) =>
          `p-2 rounded ${isSelected ? '!background-light700_dark300 !text-dark300_light700' : isFocused ? '!bg-dark-300' : ''}`,
        multiValue: () =>
          '!secondary-gradient !text-light-900 rounded px-2 py-1 flex items-center',
        multiValueLabel: () => '!text-light-900',
        multiValueRemove: () =>
          '!text-light-400 hover:!text-light-900 hover:!bg-red-500 py-1  rounded',
        indicatorsContainer: () => '!text-light-400',
        placeholder: () => '!text-light-400',
      }}
      onChange={
        onChange as unknown as
          | ((
              newValue: MultiValue<SelectOption>,
              actionMeta: ActionMeta<SelectOption>,
            ) => void)
          | undefined
      }
      value={value}
      options={options}
    />
  )
}

export default MultiSelect
