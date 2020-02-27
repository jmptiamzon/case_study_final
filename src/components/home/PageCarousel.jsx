import React from 'react';
import Carousel from 'react-bootstrap/Carousel';

function PageCarousel() {
    return(
        <Carousel>
            <Carousel.Item>
                <img
                className="d-block w-100"
                src="http://symphony-consulting.com/wp-content/uploads/2018/04/Get-the-maximum-of-your-HR-department.jpg"
                alt="First slide"
                />
                <Carousel.Caption>
                <h3>Manage Employees</h3>
                </Carousel.Caption>
            </Carousel.Item>

            <Carousel.Item>
                <img
                className="d-block w-100"
                src="http://symphony-consulting.com/wp-content/uploads/2018/04/Optimize-your-HR-structure.jpg"
                alt="Third slide"
                />

                <Carousel.Caption>
                <h3>Manage Compensations</h3>
                </Carousel.Caption>
            </Carousel.Item>

            <Carousel.Item>
                <img
                className="d-block w-100"
                src="https://www.equilar.com/images/blog/411/blog-2-1-say-on-pay-and-effect-on-ceo-compensation-800x400.png"
                alt="Third slide"
                />

                <Carousel.Caption>
                <h3>View Compensation History</h3>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    );
}

export default PageCarousel;