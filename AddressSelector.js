
import React from 'react';
import CommonController from 'common/controller/CommonController';
import ajaxService from 'common/util/ajaxService';
import ajaxConfig from 'common/ajaxConfig';
import { Select } from 'antd';
const Option = Select.Option;
require('css-loader!./index.styl');

class AddressSelector extends CommonController {
    constructor(props) {
        super(props);
        this.state = {
            area: props.area,
            provinces: [],
            cities: [],
            districts: []
        };
    }

    // 获取地址列表
    getAreaList = (id, type) => {
        const self = this;
        ajaxService
            .get(ajaxConfig.AREA.LIST, { id: id })
            .then((res) => {
                if (type === 'province') {
                    self.setState({
                        provinces: res.data,
                    });
                } else if (type === 'city') {
                    self.setState({
                        cities: res.data,
                    });
                } else {
                    self.setState({
                        districts: res.data
                    });
                }
            });
    }

    componentDidMount() {
        const self = this;
        self.getAreaList('', 'province');
        const area = self.state.area;
        if (area.province) {
            self.getAreaList(area.province.id, 'city');
            self.getAreaList(area.city.id, 'district');
        }
    }

    componentWillReceiveProps(newProps) {
        if (JSON.stringify(newProps.area) !== JSON.stringify(this.props.area)) {
            const self = this;
            self.getAreaList('', 'province');
            const area = newProps.area;
            self.setState({
                area: area
            });
            if (newProps.area.province) {
                self.getAreaList(area.province.id, 'city');
                self.getAreaList(area.city.id, 'district');
            } else {
                self.setState({
                    cities: [],
                    districts: []
                });
            }
        }
    }

    getCurrentObj = (objArr, id) => {
        const length = objArr.length;
        let obj = {};
        for (let i = 0; i < length; i++) {
            if (objArr[i].id === id) {
                obj = objArr[i];
                break;
            }
        }
        return obj;
    }
    // 选择省
    onProvinceChange = (id) => {
        const self = this;
        const province = self.getCurrentObj(self.state.provinces, id);
        const area = JSON.parse(JSON.stringify(self.state.area));
        area.province = province;
        area.city = {
            id: -1,
            name: '城市'
        };
        area.district = {
            id: -1,
            name: '区县'
        };
        self.setState({
            area: area,
            districts: []
        });
        self.getAreaList(province.id, 'city');
    }
    // 选择市
    onCityChange = (id) => { 
        const self = this;
        const city = self.getCurrentObj(self.state.cities, id);
        const area = JSON.parse(JSON.stringify(self.state.area));
        area.city = city;
        area.district = {
            id: -1,
            name: '区县'
        };
        self.setState({
            area: area
        });
        self.getAreaList(city.id, 'district');
    }
    // 选择区
    onDistrictChange = (id) => {
        const self = this;
        const district = self.getCurrentObj(self.state.districts, id);
        const area = JSON.parse(JSON.stringify(self.state.area));
        area.district = district;
        self.setState({
            area: area
        });
        self.props.onAddressChange(area);
    }

    render() {
        const self = this;
        const state = self.state;
        const area = state.area;
        return (
            <div className="address-selector">
                <div className="box box-province">
                    <Select 
                        onChange={self.onProvinceChange}
                        notFoundContent="暂无数据"
                        value={area.province ? area.province.name : '省份'}
                    >
                        {
                            state.provinces.map((item) => {
                                return (
                                    <Option key={item.id} value={item.id}>{item.name}</Option>
                                );
                            })
                        }
                    </Select>
                </div>
                <div className="box box-city">
                    <Select 
                        onChange={self.onCityChange}
                        notFoundContent="暂无数据"
                        value={area.city ? area.city.name : '城市'}
                    >
                        {
                            state.cities.map((item) => {
                                return (
                                    <Option key={item.id} value={item.id}>{item.name}</Option>
                                );
                            })
                        }
                    </Select>
                </div>
                <div className="box box-district">
                    <Select 
                        onChange={self.onDistrictChange}
                        notFoundContent="暂无数据"
                        value={area.district ? area.district.name : '区县'}
                    >
                        {
                            state.districts.map((item) => {
                                return (
                                    <Option key={item.id} value={item.id}>{item.name}</Option>
                                );
                            })
                        }
                    </Select>
                </div>
            </div>
        );
    }
}
export default AddressSelector;