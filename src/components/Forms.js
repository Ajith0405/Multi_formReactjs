import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Check from '@mui/icons-material/Check';
import validator from 'validator'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';


import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SchoolIcon from '@mui/icons-material/School';
import ContactsIcon from '@mui/icons-material/Contacts';
import TerminalIcon from '@mui/icons-material/Terminal';
import WorkHistoryIcon from '@mui/icons-material/WorkHistory';






// Navbar



const QontoStepIconRoot = styled('div')(({ theme, ownerState }) => ({
    color: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#eaeaf0',
    display: 'flex',
    height: 22,
    alignItems: 'center',
    ...(ownerState.active && {
        color: '#784af4',
    }),
    '& .QontoStepIcon-completedIcon': {
        color: '#784af4',
        zIndex: 1,
        fontSize: 18,
    },
    '& .QontoStepIcon-circle': {
        width: 8,
        height: 8,
        borderRadius: '50%',
        backgroundColor: 'currentColor',
    },
}));

function QontoStepIcon(props) {
    const { active, completed, className } = props;

    return (
        <QontoStepIconRoot ownerState={{ active }} className={className}>
            {completed ? (
                <Check className="QontoStepIcon-completedIcon" />
            ) : (
                <div className="QontoStepIcon-circle" />
            )}
        </QontoStepIconRoot>
    );
}

QontoStepIcon.propTypes = {
    /**
     * Whether this step is active.
     * @default false
     */
    active: PropTypes.bool,
    className: PropTypes.string,
    /**
     * Mark the step as completed. Is passed to child components.
     * @default false
     */
    completed: PropTypes.bool,
};



const ColorlibStepIconRoot = styled('div')(({ theme, ownerState }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#ccc',
    zIndex: 1,
    color: '#fff',
    width: 50,
    height: 50,
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    ...(ownerState.active && {
        backgroundImage:
            'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
        boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
    }),
    ...(ownerState.completed && {
        backgroundImage:
            'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
    }),
}));

function ColorlibStepIcon(props) {
    const { active, completed, className } = props;

    const icons = {
        1: <AccountCircleIcon />,
        2: <SchoolIcon />,
        3: <ContactsIcon />,
        4: <TerminalIcon />,
        5: <WorkHistoryIcon />
    };

    return (
        <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
            {icons[String(props.icon)]}
        </ColorlibStepIconRoot>
    );
}

ColorlibStepIcon.propTypes = {
    /**
     * Whether this step is active.
     * @default false
     */
    active: PropTypes.bool,
    className: PropTypes.string,
    /**
     * Mark the step as completed. Is passed to child components.
     * @default false
     */
    completed: PropTypes.bool,
    icon: PropTypes.node,
};


const steps = ['Personal Details', 'Education Details', 'Contact Details', 'Professional Skills', 'Experience'];

export default function HorizontalLinearStepper() {
    const [activeStep, setActiveStep] = React.useState(0);
    const [skipped, setSkipped] = React.useState(new Set());

    const isStepOptional = (step) => {
        return step === 1;
    };

    const isStepSkipped = (step) => {
        return skipped.has(step);
    };

    const handleNext = () => {
        let newSkipped = skipped;
        if (isStepSkipped(activeStep)) {
            newSkipped = new Set(newSkipped.values());
            newSkipped.delete(activeStep);
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleSkip = () => {
        if (!isStepOptional(activeStep)) {
            throw new Error("You can't skip a step that isn't optional.");
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped((prevSkipped) => {
            const newSkipped = new Set(prevSkipped.values());
            newSkipped.add(activeStep);
            return newSkipped;
        });
    };

    const handleReset = () => {
        setActiveStep(0);
    };


    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);



    //formData1
    const [formData1, setFormData1] = useState({
        firstName: '',
        lastName: '',
        dob: '',
        gender: '',
        age: '',
        Nationality: '',
        userName: '',
        password: '',
    });

    const [errorsForm1, setErrorsForm1] = useState('')
    const password_pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$!%^&*])[A-Za-z\d@#$!%^&*]{8,}$/;

    function ValidationForm1(formData1) {
        const errors = {
            firstName: '',
            lastName: '',
            age: '',
            nationality: '',
            userName: '',
            password: ''
        }
        if (formData1.firstName === "") {
            errors.firstName = "first name is required!"
        }
        if (formData1.lastName === "") {
            errors.lastName = "last name is required!"
        }
        if (formData1.age < 18) {
            errors.age = "age must above 18"
        }
        if (formData1.lastName === "") {
            errors.lastName = "last name is required!"
        }
        if (formData1.password === "") {
            errors.password = "Password required!"
        } else if (!password_pattern.test(formData1.password)) {
            errors.password = "password must Contains  (At least 8 character, 1 uppercase,1 lowercase, 1 special character)"
        }
        return errors;
    }

    function handleForm1Validation(event) {
        event.preventDefault();
        setErrorsForm1(ValidationForm1(formData1))
        if (password_pattern.test(formData1.password)) {
            handleSaveForm1()
        }
    }
    const handleChangeForm1 = (e) => {
        const { id, value } = e.target;
        setFormData1({ ...formData1, [id]: value });
    };

    const [isDisabledForm1, setIsDisabledForm1] = useState(false);

    const toggleDisableForm1 = () => {
        setIsDisabledForm1(true);
    };
    const handleSaveForm1 = () => {
        console.log(formData1);
        handleNext();
        toggleDisableForm1();

    };

    const handleEditFrom1 = () => {
        setIsDisabledForm1(false)
    }

    //Form 2
    const [formData2, setFormData2] = useState({
        SSLCschoolName: '',
        SSLCPercentage: '',
        HSCShoolName: '',
        HSCPercentage: '',
        College: '',
        Degree_Special: '',
        DegreePercentage: '',
    });

    const [isDisabledForm2, setIsDisabledForm2] = useState(false);
    const toggleDisableForm2 = () => {
        setIsDisabledForm2(true);
    };
    const handleEditFrom2 = () => {
        setIsDisabledForm2(false)
    }
    const handleChangeForm2 = (e) => {
        const { id, value } = e.target;
        setFormData2({ ...formData2, [id]: value });

    };

    const handleForm2Validation = (event) => {
        event.preventDefault();
        handleSaveForm2()
    }
    const handleSaveForm2 = () => {
        console.log(formData2);
        handleNext();
        toggleDisableForm2();
    };

    //Form3
    const [formData3, setFormData3] = useState({
        email: '',
        mobile: '',
        wtsnum: '',
        address: '',
        country: '',
        state: '',
        city: '',
        pincode: ''
    });
    const [errorsForm3, setErrorsForm3] = useState({
        email: '',
        mobile: '',
        wtsnum: ''
    })
    const mobilePattern = /^\d{10,12}$/;

    function ValidationForm3(formData3) {
        const newErrors = {
            email: '',
            mobile: '',
            wtsnum: '',
        }

        if (formData3.email.trim() === "") {
            newErrors.email = "Enter email id"
        } else if (!validator.isEmail(formData3.email)) {
            newErrors.email = 'Enter valid Email!'
        }
        if (formData3.mobile.trim() === "") {
            newErrors.mobile = "mobile number is required"
        } else if (!mobilePattern.test(formData3.mobile)) {
            newErrors.mobile = "mobile number notvalid"
        }
        if (formData3.wtsnum.trim() === "") {
            newErrors.wtsnum = "whats number is required"
        } else if (!mobilePattern.test(formData3.wtsnum)) {
            newErrors.wtsnum = "whats number notvalid"
        }



        return newErrors;
    }

    const [isDisabledForm3, setIsDisabledForm3] = useState(false);

    function handleForm3Validation(event) {
        event.preventDefault();
        console.log(errorsForm3);
        setErrorsForm3(ValidationForm3(formData3))
        if (mobilePattern.test(formData3.mobile) && mobilePattern.test(formData3.wtsnum)) {
            handleSaveForm3()
        }

    }

    const toggleDisableForm3 = () => {
        setIsDisabledForm3(true);
    };
    const handleEditFrom3 = () => {
        setIsDisabledForm3(false)
    }
    const handleChangeForm3 = (e) => {
        const { id, value } = e.target;
        setFormData3({ ...formData3, [id]: value });

    };
    const handleSaveForm3 = () => {
        console.log(formData3);
        handleNext();
        toggleDisableForm3();
    };


    // form 4
    const [formData4, setFormData4] = useState({
        programmingLanguage: "",
        english: false,
        tamil: false,
        hobbies_Interests: "",
        soft_skills: "",
        Certifications: "",
        projects: ""
    });
    const [isDisabledForm4, setIsDisabledForm4] = useState(false);

    const toggleDisableForm4 = () => {
        setIsDisabledForm4(true);
    };

    const handleSaveForm4 = (e) => {
        e.preventDefault();
        console.log(formData4);
        toggleDisableForm4();
        handleNext();

    };
    const handleEditFrom4 = () => {
        setIsDisabledForm4(false)
    }

    // form 5
    const [formData5, setFormData5] = useState({
        domine: "",
        years: ""
    })

    const [isDisabledForm5, setIsDisabledForm5] = useState(false);

    const toggleDisableForm5 = () => {
        setIsDisabledForm5(true);
    };
    const handleEditFrom5 = () => {
        setIsDisabledForm5(false)
    }
    const handleSaveForm5 = (e) => {
        e.preventDefault();
        const form = formRef.current;

        if (form.checkValidity())
            toggleDisableForm5(false);
        console.log(formData5);
        handleNext()
    };
    const formRef = useRef(null);



    const finalSubmit = { ...formData1, ...formData2, ...formData3, ...formData4, ...formData5 }

    const handleFinalSubmit = () => {
        console.log(finalSubmit);
        alert("Application submited successfully..!");
        window.location.reload();
    }

    return (
        <div className='container-fluid mt-2'>
            <Box sx={{ width: '100%', margin: '0px auto' }}>
                <div className='row'>
                    <div className='col-12 col-lg-12'>
                        <Stepper activeStep={activeStep} >
                            {steps.map((label, index) => {
                                const stepProps = {};
                                const labelProps = {};
                                if (isStepOptional(index)) {
                                    labelProps.optional = (
                                        <Typography variant="caption"></Typography>
                                    );
                                }
                                if (isStepSkipped(index)) {
                                    stepProps.completed = false;
                                }
                                return (
                                    <Step key={label} {...stepProps}>
                                        <StepLabel {...labelProps} StepIconComponent={ColorlibStepIcon} >{windowWidth > 470 ? <>{label}</> : null}</StepLabel>
                                    </Step>
                                );
                            })}
                        </Stepper>
                    </div>
                </div>
                {activeStep === steps.length ? (
                    <React.Fragment>
                        <Typography sx={{ mt: 2, mb: 1 }}>
                            <h2 className='text-center'>All steps completed - you&apos;re finished</h2>
                            <div className='row'>
                                <div className='col-12 col-lg-6 mx-auto '>
                                    <Accordion>
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="panel1a-content"
                                            id="panel1a-header"
                                        >
                                            <Typography sx={{fontWeight:"bolder",color:'red'}}>Personal Details</Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <Typography>
                                            <div className=''>
                                                    <p><span style={{fontWeight:'bold'}}>First Name : </span>{formData1.firstName}</p>
                                                    <p><span style={{fontWeight:'bold'}}>Last Name : </span>{formData1.lastName}</p>
                                                    <p><span style={{fontWeight:'bold'}}>Age : </span>{formData1.age}</p>
                                                    <p><span style={{fontWeight:'bold'}}>Nationality : </span>{formData1.nationality}</p>
                                                    <p><span style={{fontWeight:'bold'}}>Username : </span>{formData1.userName}</p>
                                                    <p><span style={{fontWeight:'bold'}}>Password : </span>{formData1.password}</p>
                                                </div>
                                            </Typography>
                                        </AccordionDetails>
                                    </Accordion>
                                    <Accordion>
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="panel2a-content"
                                            id="panel2a-header"
                                        >
                                            <Typography sx={{fontWeight:"bolder",color:'red'}} >Education Details</Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <Typography>
                                            <div className=''>
                                                    <p><span style={{fontWeight:'bold'}}>SSLC School : </span>{formData2.SSLCschoolName}</p>
                                                    <p><span style={{fontWeight:'bold'}}>SSLC Percentage : </span>{formData2.SSLCPercentage}</p>
                                                    <p><span style={{fontWeight:'bold'}}>HSC School : </span>{formData2.HSCShoolName}</p>
                                                    <p><span style={{fontWeight:'bold'}}>HSC Percentage : </span>{formData2.HSCPercentage}</p>
                                                    <p><span style={{fontWeight:'bold'}}>College : </span>{formData2.College}</p>
                                                    <p><span style={{fontWeight:'bold'}}>Degree : </span>{formData2.Degree_Special}</p>
                                                    <p><span style={{fontWeight:'bold'}}>Degree Percentage : </span>{formData2.DegreePercentage}</p>
                                                </div>
                                            </Typography>
                                        </AccordionDetails>
                                    </Accordion>
                                    <Accordion>
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="panel3a-content"
                                            id="panel3a-header"
                                        >
                                            <Typography sx={{fontWeight:"bolder",color:'red'}} > Contact Details</Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <Typography>
                                            <div className=''>
                                                    <p><span style={{fontWeight:'bold'}}>Email : </span>{formData3.email}</p>
                                                    <p><span style={{fontWeight:'bold'}}>Mobile Number : </span>{formData3.mobile}</p>
                                                    <p><span style={{fontWeight:'bold'}}>What's Number : </span>{formData3.wtsnum}</p>
                                                    <p><span style={{fontWeight:'bold'}}>Address : </span>{formData3.address}</p>
                                                    <p><span style={{fontWeight:'bold'}}>Country: </span>{formData3.country}</p>
                                                    <p><span style={{fontWeight:'bold'}}>State : </span>{formData3.state}</p>
                                                    <p><span style={{fontWeight:'bold'}}>City : </span>{formData3.city}</p>
                                                    <p><span style={{fontWeight:'bold'}}>PIN : </span>{formData3.pincode}</p>
                                                </div>
                                            </Typography>
                                        </AccordionDetails>
                                    </Accordion>
                                    <Accordion>
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="panel3a-content"
                                            id="panel3a-header"
                                        >
                                            <Typography sx={{fontWeight:"bolder",color:'red'}} >Professional Skills</Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <Typography>
                                            <div className=''>
                                                    <p><span style={{fontWeight:'bold'}}>Programming Language : </span>{formData4.programmingLanguage}</p>
                                                    <p><span style={{fontWeight:'bold'}}>hobbies & Interests : </span>{formData4.hobbies_Interests}</p>
                                                    <p><span style={{fontWeight:'bold'}}>Soft skills : </span>{formData4.soft_skills}</p>
                                                    <p><span style={{fontWeight:'bold'}}>Certifications: </span>{formData4.Certifications}</p>
                                                    <p><span style={{fontWeight:'bold'}}>Projects : </span>{formData4.projects}</p>
                                                    
                                                </div>
                                            </Typography>
                                        </AccordionDetails>
                                    </Accordion>
                                    <Accordion>
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="panel3a-content"
                                            id="panel3a-header"
                                        >
                                            <Typography sx={{fontWeight:"bolder",color:'red'}} >Experience</Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <Typography>
                                            <div className=''>
                                                    <p><span style={{fontWeight:'bold'}}>Domine : </span>{formData5.domine}</p>
                                                    <p><span style={{fontWeight:'bold'}}>Years </span>{formData5.years}</p>
                                                   
                                                    
                                                </div>
                                            </Typography>
                                        </AccordionDetails>
                                    </Accordion>

                                    <div className='d-flex justify-content-center mt-2'>
                                        <button type='button' className='btn btn-success' onClick={handleFinalSubmit} >Final submit</button>
                                    </div>
                                    
                                </div>
                            
                               
                                
                            </div>
                        </Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                            <Box sx={{ flex: '1 1 auto' }} />
                            <Button onClick={handleReset}>Reset</Button>
                        </Box>
                    </React.Fragment>
                ) : (
                    <React.Fragment>
                        {(activeStep + 1 === 1) ?
                            <Typography sx={{ mt: 2, mb: 1 }}>
                                <div className='container' style={{ backgroundColor: 'lightgray', borderRadius: '10px', minHeight: '530px' }}>
                                    <h3 className='text-center pt-3'>PERSONAL DETAILS</h3>
                                    <hr />
                                    <form onSubmit={handleForm1Validation} >
                                        <div className='d-flex justify-content-center mt-3' >
                                            <div className='row w-75'>
                                                <div className='col-lg-6'>
                                                    <div className="mb-3">
                                                        <label htmlFor="firstName" className="form-label">First Name</label>
                                                        <input required type="text" className="form-control" id="firstName" disabled={isDisabledForm1} onChange={handleChangeForm1} value={formData1.firstName} />
                                                        {errorsForm1.firstName && <p style={{ color: "red" }}>{errorsForm1.firstName}</p>}
                                                    </div>
                                                    <div className="mb-3">
                                                        <label htmlFor="lastName" className="form-label">Last Name</label>
                                                        <input required type="text" className="form-control" id="lastName" disabled={isDisabledForm1} onChange={handleChangeForm1} value={formData1.lastName} />
                                                        {errorsForm1.lastName && <p style={{ color: "red" }}>{errorsForm1.lastName}</p>}
                                                    </div>

                                                    <div className="mb-3">
                                                        <label htmlFor="dob" className="form-label">Date of Birth</label>
                                                        <input required type="date" className="form-control" id="dob" disabled={isDisabledForm1} onChange={handleChangeForm1} value={formData1.dob} />
                                                    </div>
                                                    <div className="mb-3">
                                                        <label htmlFor="gender" className="form-label">Gender</label>
                                                        <div className='d-flex justify-content-around w-100' >
                                                            <div className="form-check me-2 rounded-2" style={{ backgroundColor: 'white', padding: '5px 10px 5px 30px' }}>
                                                                <input
                                                                    required
                                                                    className="form-check-input"
                                                                    type="radio"
                                                                    name="gender"
                                                                    value="male"
                                                                    onChange={e => setFormData1({ ...formData1, gender: e.target.value })}
                                                                    disabled={isDisabledForm1}
                                                                />
                                                                <label className="form-check-label"  >
                                                                    Male
                                                                </label>
                                                            </div>
                                                            <div className="form-check rounded-2" style={{ backgroundColor: 'white', padding: '5px 10px 5px 30px' }} >
                                                                <input
                                                                    required
                                                                    className="form-check-input"
                                                                    type="radio"
                                                                    name="gender"
                                                                    value="female"
                                                                    onChange={e => setFormData1({ ...formData1, gender: e.target.value })}
                                                                    disabled={isDisabledForm1}
                                                                />
                                                                <label className="form-check-label">
                                                                    Female
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='col-lg-6'>
                                                    <div className="mb-3">
                                                        <label htmlFor="age" className="form-label">Age</label>
                                                        <input required type="number" className="form-control" id="age" disabled={isDisabledForm1} onChange={handleChangeForm1} value={formData1.age} />
                                                        {errorsForm1.age && <p style={{ color: "red" }}>{errorsForm1.age}</p>}
                                                    </div>

                                                    <div className="mb-3">
                                                        <label htmlFor="Nationality" className="form-label">Nationality</label>
                                                        <input required type="text" className="form-control" id="Nationality" disabled={isDisabledForm1} onChange={handleChangeForm1} value={formData1.Nationality} />
                                                    </div>
                                                    <div className="mb-3">
                                                        <label htmlFor="userName" className="form-label">User Name</label>
                                                        <input required type="text" className="form-control" id="userName" disabled={isDisabledForm1} onChange={handleChangeForm1} value={formData1.userName} />
                                                    </div>
                                                    <div className="mb-3">
                                                        <label htmlFor="password" className="form-label">Password</label>
                                                        <input required type="password" className="form-control" id="password" disabled={isDisabledForm1} onChange={handleChangeForm1} value={formData1.password} />
                                                        {errorsForm1.password && <p style={{ color: 'red' }}>{errorsForm1.password}</p>}
                                                    </div>
                                                </div>
                                                <div className='d-flex justify-content-around py-4'>

                                                    <button type='submit' className='btn btn-primary'>Save</button>
                                                    <button type='button' className='btn btn-warning' onClick={handleEditFrom1} >Edit</button>

                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </Typography>
                            : null}
                        {(activeStep + 1 === 2) ?
                            <Typography sx={{ mt: 2, mb: 1 }}>
                                <div className='container' style={{ backgroundColor: 'lightgray', borderRadius: '10px' }}>
                                    <h3 className='text-center pt-3'>Education Details</h3>
                                    <hr />
                                    <form onSubmit={handleForm2Validation} >
                                        <div className='d-flex justify-content-center mt-3' >
                                            <div className='row w-75'>
                                                <div className='col-lg-6'>
                                                    <div class="mb-3">
                                                        <label for="SSLCschoolName" class="form-label">SSLC School Name</label>
                                                        <input required type="text" class="form-control" id="SSLCschoolName" disabled={isDisabledForm2} onChange={handleChangeForm2} value={formData2.SSLCschoolName} />
                                                    </div>
                                                    <div class="mb-3">
                                                        <label for="SSLCPercentage" class="form-label">SSLC Percentage</label>
                                                        <input required type="number" class="form-control" id="SSLCPercentage" disabled={isDisabledForm2} onChange={handleChangeForm2} value={formData2.SSLCPercentage} />
                                                    </div>

                                                    <div class="mb-3">
                                                        <label for="HSCShoolName" class="form-label">HSC School Name</label>
                                                        <input required type="text" class="form-control" id="HSCShoolName" disabled={isDisabledForm2} onChange={handleChangeForm2} value={formData2.HSCShoolName} />
                                                    </div>
                                                    <div class="mb-3">
                                                        <label for="HSCPercentage" class="form-label">HSC Percentage</label>
                                                        <input required type="number" class="form-control" id="HSCPercentage" disabled={isDisabledForm2} onChange={handleChangeForm2} value={formData2.HSCPercentage} />
                                                    </div>
                                                </div>
                                                <div className='col-lg-6'>
                                                    <div class="mb-3">
                                                        <label for="College" class="form-label">College Name</label>
                                                        <input required type="text" class="form-control" id="College" disabled={isDisabledForm2} onChange={handleChangeForm2} value={formData2.College} />
                                                    </div>

                                                    <div class="mb-3">
                                                        <label for="Degree_Special" class="form-label">Degree & Specialization</label>
                                                        <input required type="text" class="form-control" id="Degree_Special" disabled={isDisabledForm2} onChange={handleChangeForm2} value={formData2.Degree_Special} />
                                                    </div>
                                                    <div class="mb-3">
                                                        <label for="DegreePercentage" class="form-label">Degree Percentage</label>
                                                        <input required type="number" class="form-control" id="DegreePercentage" disabled={isDisabledForm2} onChange={handleChangeForm2} value={formData2.DegreePercentage} />
                                                    </div>

                                                </div>
                                                <div className='d-flex justify-content-around py-4'>

                                                    <button type='submit' className='btn btn-primary'>Save</button>
                                                    <button type='button' className='btn btn-primary' onClick={handleEditFrom2}>Edit</button>

                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </Typography> : null}
                        {(activeStep + 1 === 3) ?
                            <Typography sx={{ mt: 2, mb: 1 }}>
                                <div className='container' style={{ backgroundColor: 'lightgray', borderRadius: '10px' }}>
                                    <h3 className='text-center pt-3'>Contact Details</h3>
                                    <hr />
                                    <form onSubmit={handleForm3Validation} >
                                        <div className='d-flex justify-content-center mt-3'>
                                            <div className='row w-75'>
                                                <div className='col-lg-6'>
                                                    <div className="mb-3">
                                                        <label htmlFor="email" className="form-label">Email</label>
                                                        <input type="email" className="form-control" id="email" placeholder='Enter email' disabled={isDisabledForm3} onChange={handleChangeForm3}
                                                            value={formData3.email} />
                                                        {errorsForm3.email && <p style={{ color: "red" }}>{errorsForm3.email}</p>}
                                                    </div>
                                                    <div className="mb-3">
                                                        <div>
                                                            <label htmlFor="mobile" className="form-label">Mobile</label>
                                                            <input className='form-control'

                                                                type="tel"
                                                                placeholder="Enter mobile number"
                                                                id="mobile"
                                                                disabled={isDisabledForm3}
                                                                onChange={handleChangeForm3}
                                                                value={formData3.mobile}
                                                            />
                                                            {errorsForm3.mobile && <p style={{ color: "red" }}>{errorsForm3.mobile}</p>}
                                                        </div>
                                                    </div>

                                                    <div className="mb-3">
                                                        <label htmlFor="wtsnum" className="form-label">What's App Number</label>
                                                        <input type="tel" className="form-control" id="wtsnum" placeholder='Enter whats app number' disabled={isDisabledForm3}

                                                            onChange={handleChangeForm3}
                                                            value={formData3.wtsnum}
                                                        />
                                                        {errorsForm3.wtsnum && <p style={{ color: "red" }}>{errorsForm3.wtsnum}</p>}
                                                    </div>
                                                    <div className="mb-3">
                                                        <label htmlFor="address" className="form-label">Address </label>
                                                        <textarea type="textarea" className="form-control" id="address" disabled={isDisabledForm3} rows={'2'}
                                                            onChange={handleChangeForm3}
                                                            value={formData3.address}
                                                        />
                                                    </div>
                                                </div>
                                                <div className='col-lg-6'>
                                                    <div className="mb-3">
                                                        <label htmlFor="country" className="form-label">Country</label>
                                                        <input type="text" className="form-control" disabled={isDisabledForm3} id="country" onChange={handleChangeForm3} value={formData3.country} />
                                                    </div>
                                                    <div className="mb-3">
                                                        <label htmlFor="state" className="form-label">State</label>
                                                        <input type="text" className="form-control" disabled={isDisabledForm3} id="state" onChange={handleChangeForm3} value={formData3.state} />
                                                    </div>
                                                    <div className="mb-3">
                                                        <label htmlFor="city" className="form-label">City</label>
                                                        <input type="text" className="form-control" disabled={isDisabledForm3} id="city" onChange={handleChangeForm3} value={formData3.city} />
                                                    </div>
                                                    <div className="mb-3">
                                                        <label htmlFor="pincode" className="form-label">Postal Code </label>
                                                        <input type="text" className="form-control" disabled={isDisabledForm3} id="pincode" onChange={handleChangeForm3} value={formData3.pincode} />
                                                    </div>

                                                </div>
                                                <div className='d-flex justify-content-around py-4'>

                                                    <button type='submit' className='btn btn-primary'>Save</button>
                                                    <button type='button' className='btn btn-warning' onClick={handleEditFrom3}>Edit</button>

                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </Typography> : null}
                        {(activeStep + 1 === 4) ?
                            <Typography sx={{ mt: 2, mb: 1 }}>
                                <div className='container' style={{ backgroundColor: 'lightgray', borderRadius: '10px' }}>
                                    <h3 className='text-center pt-3'>Skills</h3>
                                    <hr />
                                    <form onSubmit={handleSaveForm4}>
                                        <div className='d-flex justify-content-center mt-3' >
                                            <div className='row w-75'>
                                                <div className='col-lg-6'>
                                                    <div className="mb-3">
                                                        <label htmlFor="programmingLanguage" className="form-label">Programming Language</label>
                                                        <select required className="form-select" disabled={isDisabledForm4} onChange={e => setFormData4({ ...formData4, programmingLanguage: e.target.value })}>
                                                            <option value='' >--Select--</option>
                                                            <option value="C">C</option>
                                                            <option value='C++' >C++</option>
                                                            <option value='JAVA' >JAVA</option>
                                                            <option value='PYTHON'>PYTHON</option>
                                                        </select>
                                                    </div>
                                                    <div className="mb-3">
                                                        <label htmlFor="languageProficiency" className="form-label">Language Proficiency</label> <br />
                                                        <div className='p-2 card' >
                                                            <label className='form-lable'>English</label>
                                                            <div className="form-check">
                                                                <div className='d-flex justify-content-between'>
                                                                    <div>
                                                                        <input required className='form-check-input' disabled={isDisabledForm4} type='checkbox' checked={formData4.english} id='english' onChange={e => setFormData4({ ...formData4, english: e.target.checked })} />
                                                                        <p>Read</p>
                                                                    </div>
                                                                    <div>
                                                                        <p>Write</p>
                                                                    </div>
                                                                    <div>
                                                                        <p>Speak</p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className='p-2 card' >
                                                            <label className='form-lable'>Tamil</label>
                                                            <div className="form-check">
                                                                <div className='d-flex justify-content-between'>
                                                                    <div>
                                                                        <input required className="form-check-input" type="checkbox" disabled={isDisabledForm4} id='tamil' checked={formData4.tamil} onChange={e => setFormData4({ ...formData4, tamil: e.target.checked })} />
                                                                        <p>Read</p>
                                                                    </div>
                                                                    <div>
                                                                        <p>Write</p>
                                                                    </div>
                                                                    <div>
                                                                        <p>Speak</p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="mb-3">
                                                        <label htmlFor="hobbies" className="form-label">Hobbies and Interests</label>
                                                        <input required type="text" className="form-control" id="hobbies_Interests" disabled={isDisabledForm4} value={formData4.hobbies_Interests} onChange={e => setFormData4({ ...formData4, hobbies_Interests: e.target.value })} />
                                                    </div>
                                                </div>
                                                <div className='col-lg-6'>
                                                    <div className="mb-3">
                                                        <div className="mb-3">
                                                            <label htmlFor="dob" className="form-label">Soft Skills</label>
                                                            <textarea required className='form-control' rows={'3'} id='soft_skills' disabled={isDisabledForm4} value={formData4.soft_skills} onChange={e => setFormData4({ ...formData4, soft_skills: e.target.value })} />
                                                        </div>
                                                    </div>

                                                    <div className="mb-3">
                                                        <label htmlFor="Nationality" className="form-label">Certifications and Training</label>
                                                        <textarea required className='form-control' rows={'2'} id='Certifications' disabled={isDisabledForm4} value={formData4.Certifications} onChange={e => setFormData4({ ...formData4, Certifications: e.target.value })} />
                                                    </div>
                                                    <div className="mb-3">
                                                        <label htmlFor="userName" className="form-label">Projects or Portfolio Link</label>
                                                        <textarea required className='form-control' rows={'2'} id='projects' disabled={isDisabledForm4} value={formData4.projects} onChange={e => setFormData4({ ...formData4, projects: e.target.value })} />
                                                    </div>
                                                </div>
                                                <div className='d-flex justify-content-around py-4'>

                                                    <button type='submit' className='btn btn-primary'>Save</button>
                                                    <button type='button' className='btn btn-warning' onClick={handleEditFrom4}>Edit</button>

                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </Typography>
                            : null}
                        {(activeStep + 1 === 5) ?
                            <Typography sx={{ mt: 2, mb: 1 }}>
                                <div className='container' style={{ backgroundColor: 'lightgray', borderRadius: '10px' }}>
                                    <h3 className='text-center pt-3'>EXPREIENCE DETAILS</h3>
                                    <hr />
                                    <div  >
                                        <form ref={formRef} onSubmit={handleSaveForm5} className='d-flex justify-content-center mt-3' >
                                            <div className='row w-75'>
                                                <div className='col-lg-6'>
                                                    <div className="mb-3">
                                                        <label htmlFor="domine" className="form-label">Domine</label>
                                                        <select required className="form-select" id="domine" disabled={isDisabledForm5} onChange={e => setFormData5({ ...formData5, domine: e.target.value })}  >
                                                            <option value="">--select--</option>
                                                            <option value="front-end">Front-end</option>
                                                            <option value="backend" >Backend</option>
                                                            <option value="full-stack" >Full-stack</option>
                                                            <option value="database" >Database</option>
                                                            <option value="Testing" >Testing</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className='col-lg-6'>
                                                    <div className="mb-3">
                                                        <label htmlFor="years" className="form-label" >Number of Years</label>
                                                        <select required className="form-select" id='years' disabled={isDisabledForm5} onChange={e => setFormData5({ ...formData5, years: e.target.value })}  >
                                                            <option value="">--select--</option>
                                                            <option value="1" >1</option>
                                                            <option value="2">2</option>
                                                            <option value="3">3</option>
                                                            <option value="4">4</option>
                                                            <option value="5+">5+</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className='d-flex justify-content-around py-4'>

                                                    <button type='submit' className='btn btn-primary'>Save</button>
                                                    <button type='button' className='btn btn-warning' onClick={handleEditFrom5}>Edit</button>

                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </Typography>
                            : null}

                        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                            <Button
                                color="inherit"
                                disabled={activeStep === 0}
                                onClick={handleBack}
                                sx={{ mr: 1 }}
                            >
                                Back
                            </Button>
                            <Box sx={{ flex: '1 1 auto' }} />
                            {isStepOptional(activeStep) && (
                                <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>

                                </Button>
                            )}

                            <Button onClick={handleNext}>
                                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                            </Button>
                        </Box>
                    </React.Fragment>
                )}
            </Box>

        </div>
    );
}