import React, { useEffect, useState } from 'react';
import StatusCard from '../components/status-card/StatusCard';
import Chart from 'react-apexcharts';
import { useSelector, useDispatch } from 'react-redux';
import ThemeAction from '../redux/actions/ThemeAction';

const Dashboard = () => {
	const themeReducer = useSelector((state) => state.ThemeReducer).mode;
	const dispatch = useDispatch();
	const [liveData, setliveData] = useState(null);
	const [chartConfig, setchartConfig] = useState({
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
	});

	const [chartSeries, setchartSeries] = useState([
		{
			name: 'Online Customers',
			data: [40, 70, 20, 90, 36, 80, 30, 91, 60],
		},
		{
			name: 'Store Customers',
			data: [40, 30, 70, 80, 40, 16, 20, 51, 10],
		},
	]);

	const prepareChartData = (data) => {

		if (data != null) {
			var categories = [];
			var temperature = [];
			var humidity = [];
			data.forEach((item) => {
				categories.push(item.rowKey);
				temperature.push(item.temperature);
				humidity.push(item.humidity);
			});
			console.log(data);
			setchartSeries([
				{
					name: 'Temperature',
					data: temperature,
				},
				{
					name: 'Humidity',
					data: humidity,
				},
			]);
			setchartConfig({
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
					categories: categories,
				},
				legend: {
					position: 'top',
				},
				grid: {
					show: false,
				},
			});
		}
	};

	//redo without redux
	useEffect(() => {
		dispatch(ThemeAction.getTheme());
	});

	useEffect(() => {
		let url =
			'https://myamazingiotbackend.azurewebsites.net/api/GetData?days=35&code=o97MlGa4Qo4zEKOW1bfG8Kh3ze0cUpdVZgbecHA0jQ4hGanvubCbFw==';
		fetch(url)
			.then((response) => response.json())
			.then((data) => {
				setliveData(data[data.length - 1]);
				prepareChartData(data);
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
											...chartConfig,
											theme: { mode: 'dark' },
									  }
									: {
											...chartConfig,
											theme: { mode: 'light' },
									  }
							}
							series={chartSeries}
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
					<div>
						Temperature Inside
						<StatusCard
							icon='bx bxs-hot'
							count={liveData === null ? '-' : liveData.temperature}
							title='°C'
						/>
					</div>
					<div>
						Temperature outiside
						<StatusCard icon='bx bxs-hot' count='10.5' title='°C' />
					</div>
					<div>
						Humidity
						<StatusCard
							icon='bx bxs-droplet'
							count={liveData === null ? '-' : liveData.humidity}
							title='%'
						/>
					</div>
					<div>
						Pressure
						<StatusCard icon='bx bx-water' count='50' title='pH' />
					</div>
					<div>
						AQI
						<StatusCard icon='bx bxs-leaf' count='50' title='AQI' />
					</div>
				</div>
			</div>
		</div>
	);
};

export default Dashboard;
