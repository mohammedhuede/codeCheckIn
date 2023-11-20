import React, { Component } from 'react'
import Select, { components } from 'react-select'

class DepartmentMultiSelect extends Component {
    constructor(props) {
        super(props)

        this.state = {
            dept: [],
            procedures: []
        }
    }
    componentDidUpdate(prevProps, prevState) {   
        if(this.state.dept.length !== prevState.dept.length){
            let excluded = ''
            let excluded1 = ''
           
            this.setState({
                cDeptLength: this.state.dept.length,
                pDeptLength: prevState.dept.length
            })
            
            if(this.state.dept.length > prevState.dept.length){
                let currentDept = this.state.dept.map(obj => obj.value)
                let prevDept = prevState.dept.map(obj => obj.value)
                excluded = currentDept.filter(el => !prevDept.includes(el))[0]
                const params = {
                    partnerId: this.props.partnerId,
                    hospitalId: this.props.hospitalIdFromUrl,
                    departmentName: excluded,
                }
                this.props.getProceduresFromDepartmentRequest(params)
            } else {
                let currentDept = this.state.dept.map(obj => obj.value)
                let prevDept = prevState.dept.map(obj => obj.value)
                excluded1 = prevDept.filter(el => !currentDept.includes(el))[0]
                let arr1 = this.state.procedures.filter(obj => obj.department !== excluded1)
                this.setState({
                    procedures: arr1
                }, () => {
                    this.props.getTreatmentOptionsFromChild(this.state.procedures.map(obj => ({label: obj.procedure, value: obj.id})))
                })
            }
        }

        if (this.props.hospitalDetails?.getProceduresFromDepartmentSuccess && !prevProps.hospitalDetails?.getProceduresFromDepartmentSuccess) {
            let arr = this.props.hospitalDetails?.proceduresFromDepartment?.filter(obj => obj.id !== "" && obj.id !== null && obj.id !== undefined)
            if(this.state.cDeptLength > this.state.pDeptLength){
                this.setState({
                    procedures: [...this.state.procedures, ...arr]
                }, () => {
                    this.props.getTreatmentOptionsFromChild(this.state.procedures.map(obj => ({label: obj.procedure, value: obj.id})))
                })
            } 
        }

        if(this.props.doctorCreatedOrUpdatedSuccessfully && !prevProps.doctorCreatedOrUpdatedSuccessfully){
            this.setState({
                dept: []
            })
        }
    }
    handleSelect = (value) => {
        this.setState({
            dept: value
        })
        this.props.setDepartForChild(value.map(obj => obj.value), value)
    }

    render() {
        return (
            <div>
                <Select
                    {...this.props}
                    options={this.props.departmentsOptions}
                    value={this.props.selectDepartmentVal}
                    hasValue={true}
                    placeholder='Select Departments'
                    onChange={(val) => this.handleSelect(val)}
                    closeMenuOnSelect={false}
                    isMulti={true}
                />
            </div>
        )
    }
}

export default DepartmentMultiSelect