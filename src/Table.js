import React, { useEffect, useState } from 'react'
import { Button, Table, Select } from 'antd'
import { ApiService } from './services/api.service'
import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons'

const apiService = new ApiService()
const columns = [
	{
		title: 'Id',
		dataIndex: 'id',
		key: 'id'
	},
	{
		title: 'Продукт',
		dataIndex: 'product',
		key: 'product'
	},
	{
		title: 'Брэнд',
		dataIndex: 'brand',
		key: 'brand'
	},
	{
		title: 'Цена',
		dataIndex: 'price',
		key: 'price'
	}
]
const options = [
	{
		value: 10,
		label: '10'
	},
	{
		value: 30,
		label: '30'
	},
	{
		value: 50,
		label: '50'
	},
	{
		value: 100,
		label: '100'
	}
]

function ItemsTable() {
	const [data, setData] = useState([])
	const [offset, setOffset] = useState(0)
	const [limit, setLimit] = useState(10)
	const [loading, setLoading] = useState(false)
	const [counter, setCounter] = useState(1)

	const onNext = () => {
		setOffset(offset + limit)
		setCounter(counter + 1)
	}
	const onPrev = () => {
		setOffset(offset - limit)
		setCounter(counter - 1)
	}

	const changeItemsAmount = value => {
		setLimit(value)
	}
	const fetchData = async () => {
		setLoading(true)
		setData(await apiService.getItems({ offset, limit }))
		setLoading(false)
	}

	useEffect(() => {
		fetchData()
	}, [offset, limit])

	return (
		<>
			<div
				style={{
					display: 'flex',
					justifyContent: 'center',
					flexDirection: 'column'
				}}
			>
				<div className='table-wrapper'>
					<Table dataSource={data} columns={columns} pagination={false} loading={loading} />
				</div>
			</div>

			<span
				style={{
					display: 'flex',
					justifyContent: 'center'
				}}
			>
				<Button
					icon={<ArrowLeftOutlined />}
					disabled={offset - limit < 0}
					onClick={() => onPrev()}
					className='button-style'
				></Button>
				<span className='counter-style'>{counter} </span>
				<Button icon={<ArrowRightOutlined />} onClick={() => onNext()} className='button-style'></Button>
			</span>
			<span
				style={{
					display: 'flex',
					flexDirection: 'row-reverse'
				}}
			>
				<Select onChange={v => changeItemsAmount(v)} style={{ width: 100 }} options={options} value={limit} />
			</span>
		</>
	)
}

export default ItemsTable
