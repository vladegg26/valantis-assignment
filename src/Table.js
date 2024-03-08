import React, { useState } from 'react'
import { Button, Input, Table, Space } from 'antd'
import { ApiService } from './services/api.service'

const apiService = new ApiService()
const data = await apiService.getItems({ offset: 0, limit: 10 })
const columns = [
	{
		title: 'Id',
		dataIndex: 'id',
		key: 'id'
	},
	{
		title: 'Product',
		dataIndex: 'product',
		key: 'product'
	},
	{
		title: 'Brand',

		dataIndex: 'brand',
		key: 'brand'
	},
	{
		title: 'Price',
		dataIndex: 'price',
		key: 'price'
	}
]

function onPrev() {
	console.log('prev')
}
function onNext() {
	console.log('next')
}

function ItemsTable() {
	const [offset, setOffset] = useState(0)
	const onNext = () => {}
	return (
		<>
			<div
				style={{
					display: 'flex',
					justifyContent: 'center',
					flexDirection: 'column'
				}}
			>
				<Table dataSource={data} columns={columns} pagination={false} />
			</div>
			<div>
				<Button onClick={onPrev}> Предыдущая страница</Button>
				<Button onClick={onNext}> Следующая страница</Button>
			</div>
		</>
	)
}

export default ItemsTable
