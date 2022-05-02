import React, { useEffect, useState } from 'react';
import statusCards from '../assets/JsonData/status-card-data.json';
import StatusCard from '../components/status-card/StatusCard';
import Chart from 'react-apexcharts';
import { useSelector, useDispatch } from 'react-redux';
import ThemeAction from '../redux/actions/ThemeAction';

const chartOptions = {
	series: [
		{
			name: 'Online Customers',
			data: [40, 70, 20, 90, 36, 80, 30, 91, 60],
		},
		{
			name: 'Store Customers',
			data: [40, 30, 70, 80, 40, 16, 20, 51, 10],
		},
	],
	options: {
		color: ['#6ab04c', '#2980b9'],
		chart: {
			background: 'transparent',
		},
		dataLabels: {
			enabled: false,
		},
		stroke: {
			curve: 'smooth',
		},
		xaxis: {
			categories: [
				'Jan',
				'Feb',
				'Mar',
				'Apr',
				'May',
				'Jun',
				'Jul',
				'Aug',
				'Sep',
			],
		},
		legend: {
			position: 'top',
		},
		grid: {
			show: false,
		},
	},
};

const Dashboard = () => {
	const themeReducer = useSelector((state) => state.ThemeReducer).mode;
	const dispatch = useDispatch();
	const [liveData, setliveData] = useState(null);

	//redo without redux
	useEffect(() => {
		dispatch(ThemeAction.getTheme());
	});

	useEffect(() => {
		let url =
			'https://myamazingiotbackend.azurewebsites.net/api/GetData?days=20&code=o97MlGa4Qo4zEKOW1bfG8Kh3ze0cUpdVZgbecHA0jQ4hGanvubCbFw==';
		fetch(url)
			.then((response) => response.json())
			// 4. Setting *dogImage* to the image url that we received from the response above
			.then((data) => {
				console.log(data);
				setliveData(data[data.length - 1]);
				//console.log(lastRecord);
			});
	}, []);
	return (
		<div>
			<h2 className='page-header'>Dashboard</h2>
			<div className='row'>
				<div className='col-12'>
					<div className='card full-height'>
						{/* chart*/}
						<Chart
							options={
								themeReducer === 'theme-mode-dark'
									? {
											...chartOptions.options,
											theme: { mode: 'dark' },
									  }
									: {
											...chartOptions.options,
											theme: { mode: 'light' },
									  }
							}
							series={chartOptions.series}
							type='line'
							height='400px%'
						/>
					</div>
				</div>

				<div
					className='col-12 cards-flex'
					style={{
						display: 'flex',
						flexDirection: 'row',
						justifyContent: 'space-around',
					}}>
				<span>{liveData===null ? '': liveData.humidity}</span>	
					{statusCards.map((item, index) => (
						<div key={index}>
							{item.title}
							<StatusCard
								icon={item.icon}
								count={item.count}
								title={item.subtitle}
							/>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default Dashboard;
