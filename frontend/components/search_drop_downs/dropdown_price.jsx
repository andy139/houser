import React from 'react';
import onClickOutside from "react-onclickoutside";
import DoubleBarSlider from './doublebar_slider';
// import "!style-loader!css-loader!rc-slider/assets/index.css"; 
import Slider, { Range } from "rc-slider";



class DropdownPrice extends React.Component {
    constructor() {
        super();

        this.state = {
            whichMenu: null,
            showMenu: false,
            priceValues: [0, 5000],
            applyValues: "List Price",
        };

        this.handleChange = this.handleChange.bind(this);
        this.showMenu = this.showMenu.bind(this);
        this.closeMenu = this.closeMenu.bind(this);
        this.handleApply = this.handleApply.bind(this);
        this.handleClear = this.handleClear.bind(this);



    }

    componentDidUpdate(prevProps, prevState) {

        if (prevProps.filters != this.props.filters) {
            if (this.props.toggle) {
                this.setState({ priceValues: [0, 5000] });
                this.setState({ applyValues: "List Price" })

            }
        }



    }


    showMenu(event) {
        event.preventDefault();

        if (!this.state.showMenu) this.setState({ showMenu: true });
        if (this.state.showMenu) this.closeMenu();
    }

    closeMenu() {
        this.setState({ showMenu: false });
    }

    handleClickOutside() {
        this.closeMenu();
    }

    handleChange(priceValues) {
        this.setState({ priceValues });
    };

    handleClear() {
        this.setState({ priceValues: [0, 5000] });
        this.setState({ applyValues: "List Price" })
        this.props.updateFilter("price_range", [])

    }

    handleApply() {
        this.setState({ applyValues: "$" + `${this.makeMillions(this.state.priceValues[0])}` })
        this.props.setToggle(false);
        this.props.updateFilter("price_range", this.state.priceValues);
        this.props.clearPrimary();
        this.closeMenu();


    }

    makeMillions(num){
        if (num > 1000){ 

            let newNum = num / 1000
            return (Math.round(10 * newNum) / 10).toString() + "M"

        } else {
           return (Math.ceil(num/100) * 100 ).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "K";
        }


    }





    render() {

        const Handle = Slider.Handle;


        const priceDiv = <div>List Price</div>;
        const applyDiv = <div>${this.makeMillions(this.state.applyValues)}K</div>

        const wrapperStyle = { width: 320, margin: 20 };




        const { priceValues } = this.state;
        return (
            <div className="hover-1">
                <div className="dropdown-search" onClick={this.showMenu}>
                    <div>{this.state.applyValues}</div>
                    <i class="fas fa-chevron-down"></i>
                </div>

                {this.state.showMenu ? (
                    <div className="dropdown-click">
                        <div style={wrapperStyle}>
                            <div className="amount-title">
                                <div>List Price</div>
                                <div>
                                    ${this.makeMillions(this.state.priceValues[0])} - ${this.makeMillions(this.state.priceValues[1])}
                </div>
                            </div>

                            <Range
                                value={this.state.priceValues}
                                min={0}
                                max={5000}
                                onChange={this.handleChange}
                                pushable={true}
                                defaultValue={priceValues}
                            // tipFormatter={(value) => `${value}K`}
                            />
                            <div className="apply-clear">
                                <div className="cursorp clear" onClick={this.handleClear}>
                                    Clear
                </div>
                                <div className="cursorp" onClick={this.handleApply}>
                                    Apply
                </div>
                            </div>
                        </div>
                    </div>
                ) : null}
            </div>
        );
    }
}


export default onClickOutside(DropdownPrice);

