import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import { useNavigate, useSearchParams } from "react-router-dom";
import { connect } from 'react-redux'
import { bindActionCreators } from "redux";
import { Actions } from './../../../Redux/Actions'
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from "react-places-autocomplete";
import { validateEmail } from "../../helper/helper";
import { DeleteConfirmationModal } from "../../modals/DeleteConfirmationModal";
import { uploadFile } from "../../s3/s3";
import { getFileNameFromAwsResponse, resizeImage } from "../../utils";
import { Loader } from "../../Loader";
import { useDropzone } from 'react-dropzone'
import { Storage } from "aws-amplify";
import aws_config from "../../../aws-exports";

const hospitalCategories = ['Allopathy', 'Homeopathy', 'Ayurveda', 'Naturopathy', 'Other']
const Firststep = (props) => {
    const [stringValues, setStringValues] = useState({
        name: "", email: "", phoneNumber: "", category: "", city: "", state: "", country: "", pincode: "",
        covidTreatment: "", type: "", dmHoDocUrl: ""
    })

    let [searchParams] = useSearchParams()
    const navigate = useNavigate()

    const partnerId = localStorage.getItem('partnerId')
    const fromDashboard = searchParams.get('fd')
    const hospitalIdFromUrl = searchParams.get('hid')
    const editHospital = searchParams.get('editHospital')
    const [hospitalToEdit, setHospitalToEdit] = useState(editHospital === 'true' ? true : false)

    const [hospitalId, setHospitalId] = useState('')
    const [dmHoDocUrl, setDmHoDocUrl] = useState('')
    const [dmHoDocFile, setDmHoDocFile] = useState('')
    const [dmHoDocFileName, setDmHoDocFileName] = useState('')
    const [hospitalThumbnailUrl, setHospitalThumbnailUrl] = useState('')
    const [hospitalThumbnailFile, setHospitalThumbnailFile] = useState('')
    const [toUpdate, setToUpdate] = useState(false)
    const [submitUpdateRequest, setSubmitUpdateRequest] = useState('')
    const [submitPostRequest, setSubmitPostRequest] = useState('')
    const [submitGetRequest, setSubmitGetRequest] = useState('')
    const [errors, setErrors] = useState({})
    const [addressLine, setAddressLine] = useState('')
    const [geoAddress, setGeoAddress] = useState({})
    const [modalShow, setModalShow] = useState(false)
    const [setStateForRemoveFile, setSetStateForRemoveFile] = useState(null)
    const [setStateForRemoveUrl, setSetStateForRemoveUrl] = useState(null)
    const [setStateForRemoveFileName, setSetStateForRemoveFileName] = useState(null)
    const [galleryImagesFiles, setGalleryImagesFiles] = useState([])
    const [galleryImages, setGalleryImages] = useState([])
    const [galleryImageToDelete, setGalleryImageToDelete] = useState('')
    const [loading, setLoading] = useState(false)

    const { postHospitalBasicDetailsSuccess, getHospitalBasicDetailsSuccess, updateHospitalBasicDetailsSuccess,
        hospitalBasicDetailsData, error } = props?.hospitalDetails

    // runs only on mount
    useEffect(() => {
        if (hospitalIdFromUrl !== null && hospitalIdFromUrl !== undefined && hospitalIdFromUrl !== "") {
            setHospitalId(hospitalIdFromUrl)
            props.getHospitalId(hospitalIdFromUrl)
        }
    }, [])

    // runs only when hospitalId Change, after didMount it should run
    useEffect(() => {
        if (hospitalId !== "") {
            setSubmitGetRequest(true)
            getHospitalBasicDetailsRequest()
        }
    }, [hospitalId])

    // runs on every change in the state or props, made conditional
    useEffect(() => {
        if (submitUpdateRequest && updateHospitalBasicDetailsSuccess) {
            hospitalToEdit ? navigate(`/mainside?hid=${hospitalIdFromUrl}&step=1&editHospital=true`) : navigate(`/mainside?hid=${hospitalIdFromUrl}&step=2${fromDashboard ? '&fd=1' : ''}`)
            !hospitalToEdit && props.setStepFromChild('2')
            setSubmitUpdateRequest(false)
        }

        if (submitGetRequest && error) {
            setSubmitGetRequest(false)
        }
        if (submitPostRequest && error) {
            setSubmitPostRequest(false)
        }
        if (submitUpdateRequest && error) {
            setSubmitUpdateRequest(false)
        }
    })

    useEffect(() => {
        if (submitPostRequest && postHospitalBasicDetailsSuccess) {
            setHospitalId(hospitalBasicDetailsData.id)
            props.getHospitalId(hospitalBasicDetailsData.id)
            navigate(`/mainside?hid=${hospitalBasicDetailsData.id}&step=2${fromDashboard ? '&fd=1' : ''}`)
            props.setStepFromChild('2')
            setSubmitPostRequest(false)

        }
        setSubmitPostRequest(false)
    }, [postHospitalBasicDetailsSuccess])

    useEffect(() => {
        const getProtectFile = async (url) => {
            let str = url.split("?")[0].split('/')
            const key = decodeURI(str[str.length - 1]);
            const downloadUrl = await Storage.get(key, {
                level: 'protected',
                expires: 3600, // 1hour
                region: aws_config.Storage.AWSS3.region
            });
            setDmHoDocUrl(downloadUrl);
        }

        if (submitGetRequest && getHospitalBasicDetailsSuccess) {
            let { name, email, phoneNumber, category, addressLine, city, state, country, pincode, covidTreatment, dmHoDocUrl, hospitalThumbnailUrl, galleryImages } = props?.hospitalDetails?.hospitalBasicDetailsData
            setStringValues({ ...stringValues, name, email, phoneNumber, category, city, state, country, pincode, covidTreatment })
            // setDmHoDocUrl(getProtectFile(dmHoDocUrl));
            let str = getFileNameFromAwsResponse(dmHoDocUrl)
            setDmHoDocFileName(str)
            setAddressLine(addressLine)
            setHospitalThumbnailUrl(hospitalThumbnailUrl)
            setGalleryImages(Array.isArray(galleryImages) ? galleryImages : [])
            setSubmitGetRequest(false)
            getProtectFile(dmHoDocUrl);
        } else if (submitGetRequest && error) {
            setSubmitGetRequest(false)
        }
    }, [getHospitalBasicDetailsSuccess])


    const getHospitalBasicDetailsRequest = () => {
        const requestBody = {
            partnerId,
            hospitalId
        }
        if (hospitalId !== "" && hospitalId !== undefined && hospitalId !== null) {
            setToUpdate(true)
            setSubmitGetRequest(true)
            props.getHospitalBasicDetailsRequest(requestBody)
        }
    }

    const handleChange = (e) => {
        let value = e.target.value
        setStringValues({ ...stringValues, [e.target.name]: value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (isValid()) {
            let requestBody = {
                body: { ...stringValues, geoAddress: JSON.stringify(geoAddress), addressLine, dmHoDocUrl: dmHoDocUrl?.split("?")[0], hospitalThumbnailUrl, galleryImages },
                partnerId
            }
            if (toUpdate || (toUpdate && hospitalToEdit)) {
                requestBody = {
                    ...requestBody,
                    hospitalId
                }
                props.updateHospitalBasicDetailsRequest(requestBody)
                setSubmitUpdateRequest(true)
            } else {
                props.postHospitalBasicDetailsRequest(requestBody)
                setSubmitPostRequest(true)
            }
        }
    }

    const isValid = () => {
        let formIsValid = true
        let error = {}
        let { name, email, phoneNumber, city, state, country, pincode, covidTreatment } = stringValues

        if (name.trim() === "") {
            formIsValid = false
            error['name'] = "Name is required"
        }
        if (email.trim() === "" || validateEmail(email.trim()) === null) {
            formIsValid = false
            error['email'] = "Email address is required"
        }

        if (phoneNumber.trim() === "" || phoneNumber.trim().length !== 10) {
            formIsValid = false
            error['phoneNumber'] = "Valid phone number is required"
        }

        if (addressLine.trim() === "") {
            formIsValid = false
            error['addressLine'] = "Address is required"
        }
        if (city.trim() === "") {
            formIsValid = false
            error['city'] = "City is required"
        }
        if (state.trim() === "") {
            formIsValid = false
            error['state'] = "State is required"
        }
        if (country.trim() === "") {
            formIsValid = false
            error['country'] = "Country is required"
        }
        if (pincode.trim() === "") {
            formIsValid = false
            error['pincode'] = "Pin code is required"
        }
        if (covidTreatment.trim() === "") {
            formIsValid = false
            error['covidTreatment'] = "Covid treatment field is required"
        }
        if (dmHoDocUrl.trim() === "") {
            formIsValid = false
            error['dmHoDocUrl'] = "DM & HO document is required"
        }

        setErrors(error)
        return formIsValid
    }

    const handleChangeLocation = (location) => {
        setAddressLine(location)
    }

    const getLocation = (address) => {
        let city = '';
        let state = '';
        let country = '';
        let pincode = '';

        address.address_components.map((obj) => {
            if (obj.types.includes('administrative_area_level_2')) {
                city = obj.long_name
            }
            if (obj.types.includes('country')) {
                country = obj.long_name

            }
            if (obj.types.includes('administrative_area_level_1')) {
                state = obj.long_name
            }
            if (obj.types.includes('postal_code')) {
                pincode = obj.long_name
            }
        })
        setStringValues({ ...stringValues, city, state, country, pincode })
    }

    const handleSelect = (location) => {
        let detailedAddress = []
        setAddressLine(location)
        geocodeByAddress(location)
            .then(results => {
                detailedAddress = results[0]
                return getLatLng(results[0])
            })
            .then(latLng => {
                getLocation(detailedAddress)
                setGeoAddress({ lat: String(latLng.lat), lng: String(latLng.lng), placeId: String(detailedAddress.place_id), formattedAddress: String(detailedAddress.formatted_address) })
            })
            .catch(err => console.log('err', err))
    }

    const handleCategory = (e) => {
        setStringValues({ ...stringValues, category: e.target.value })
    }

    const goBackToHospitalDetails = () => {
        navigate(`/hospitallisting?hid=${hospitalIdFromUrl}&review=1`)
    }

    const handleChooseFile = (e, setState) => {
        let file = e.target.files[0]
        setHospitalThumbnailFile(file)
        uploadFileToS3(file, setHospitalThumbnailUrl)
    }

    const removeFile = () => {
        if (galleryImageToDelete) {
            if (typeof galleryImageToDelete === 'string') {
                const filteredArr = galleryImages.filter(el => el !== galleryImageToDelete)
                setGalleryImages(filteredArr)
            } else {
                const filteredArr = galleryImagesFiles.filter(el => (galleryImageToDelete.name !== el.fileName) && galleryImageToDelete.lastModified !== el.lastModified)
                setGalleryImagesFiles(filteredArr)
            }
            setGalleryImageToDelete('')
        } else {
            setStateForRemoveUrl('')
            setStateForRemoveFile('')
            setSetStateForRemoveUrl(null)
            setSetStateForRemoveFile(null)
            setErrors({ ...errors, "dmHoDocUrl": "" })
            if (setStateForRemoveFileName) {
                setSetStateForRemoveFileName(null)
                setStateForRemoveFileName('')
            }
        }
        setModalShow(false)
    }

    const openDeleteConfirmationModal = (setState1, setState2, setState3,) => {
        setModalShow(true)
        setSetStateForRemoveUrl(() => setState1)
        setSetStateForRemoveFile(() => setState2)
        setState3 !== null && setSetStateForRemoveFileName(() => setState3)
    }

    const openDeleteConfirmationModalForGalleryImages = (img, imgType) => {
        setGalleryImageToDelete(img)
        setModalShow(true)
    }

    const getProtectFile = async (url) => {
        let str = url.split('/')
        const key = decodeURI(str[str.length - 1]);
        return await Storage.get(key, {
            level: 'protected',
            expires: 3600, // 1hour
            region: aws_config.Storage.AWSS3.region
        });
    }

    const uploadFileToS3 = async (file, setState) => {
        try {
            setLoading(true)
            const reducedImage = await resizeImage(file, 1200, 1200);
            const imgRes = await uploadFile(reducedImage)
            if (imgRes) {
                setState(imgRes)
                setLoading(false)
            }
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }

    const uploadDmHoDocFileToS3 = async (file) => {
        try {
            setLoading(true)
            const res = await uploadFile(file, "protected")
            if (res) {
                const url = await getProtectFile(res);
                setDmHoDocUrl(url);
                setLoading(false)
                setErrors({ ...errors, dmHoDocUrl: '' })
            } else {
                setLoading(false)
            }
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }

    const uploadGalleryImagesToS3 = () => {
        try {
            setLoading(true)
            let arr = []
            galleryImagesFiles.map(async (file) => {
                const reducedImage = await resizeImage(file, 1200, 1200);
                const imgRes = await uploadFile(reducedImage)
                if (imgRes) {
                    arr.push(imgRes)
                    setGalleryImages([...galleryImages, ...arr])
                    if (arr.length === galleryImagesFiles.length) {
                        setGalleryImagesFiles([])
                        setLoading(false)
                    }

                } else {
                    setLoading(false)
                    throw new Error('Error occurred while uploading multiple images')
                }
            })
        } catch (error) {
            setLoading(false)
            console.log(error)
        }
    }


    const { getRootProps: getRootPropsGallery, getInputProps: getInputPropsGallery } = useDropzone({
        accept: "image/*",
        onDrop: (acceptedFiles) => {
            let insertedImages = acceptedFiles.map(file => Object.assign(file, {
                preview: URL.createObjectURL(file)
            }))
            setGalleryImagesFiles([...galleryImagesFiles, ...insertedImages])

        }
    })

    useEffect(() => {
        if (galleryImagesFiles.length > 0) {
            uploadGalleryImagesToS3()
        }
    }, [galleryImagesFiles.length])


    const { getRootProps: getRootPropsDMHO, getInputProps: getInputPropsDMHO } = useDropzone({
        onDrop: (acceptedFiles) => {
            let isValid = true
            let error = {}
            let insertedFile = acceptedFiles.map(file => {
                if (file.type !== 'application/pdf' && file.type !== 'image/png' && file.type !== 'image/jpg' &&
                    file.type !== 'image/jpeg' && file.type !== 'image/apng' && file.type !== 'image/avif'
                    && file.type !== 'image/svg+xml' && file.type !== 'image/webp' && file.type !== 'application/msword'
                    && file.type !== 'image/tiff' && file.type !== 'image/bmp') {
                    error["dmHoDocUrl"] = "File Format not supported. Supports only jpg, jpeg, png and pdf files."
                    isValid = false
                } else {
                    return Object.assign(file, {
                        preview: URL.createObjectURL(file)
                    })
                }
                setErrors({ ...errors, ...error })
            })
            if (isValid) {
                uploadDmHoDocFileToS3(insertedFile[0])
                setDmHoDocFile(insertedFile[0])
                setDmHoDocFileName(insertedFile[0].name)
                setDmHoDocUrl('')
            }
        }
    })


    const list = () => {
        Storage.list('photos/', { level: 'protected' })
            .then((result) => console.log('result+++++', result))
            .catch((err) => console.log('err+++++', err));
    }


    return (
        <div className="right-form">
            <div className="right-form-head">
                {hospitalToEdit ? (
                    <div className="flex-between-center">
                        <h4>Edit Hospital</h4>
                        <div>
                            <Button className="btn btn-secondary btn-sm mr-16" onClick={goBackToHospitalDetails}>Go Back</Button>
                            <Button className="btn btn-primary btn-sm" onClick={handleSubmit}>Save Changes</Button>
                        </div>
                    </div>
                ) : (
                    <>
                        <p className="subhead">`Step 1 of 8`</p>
                        <h2 className="form-main-title">Basic Details</h2>
                        <p className="subpara">Add basic details of hospital</p>
                    </>
                )}
            </div>
            <div className="maintitle d-flex">
                <img alt='hospital' src={"/images/basic_hospital.svg"} />
                <h3 className="ml-12">Hospital Details</h3>
            </div>
            <div className="main-form-block px-5 mt-32">
                <Form>
                    <div className="flex-between mb-32">
                        <Form.Group className="w-33" controlId="formBasicEmail">
                            <Form.Label>Hospital Name<span className="required"> *</span></Form.Label>
                            <Form.Control type="text" placeholder="Enter name" value={stringValues.name} name="name" onChange={handleChange} />
                            <span className="error-label">{errors['name']}</span>
                        </Form.Group>
                        <Form.Group className="w-33 ml-24" controlId="formBasicEmail">
                            <Form.Label>Hospital Email Address<span className="required"> *</span></Form.Label>
                            <Form.Control type="email" placeholder="Enter email" value={stringValues.email} name="email" onChange={handleChange} />
                            <span className="error-label">{errors['email']}</span>
                        </Form.Group>
                        <Form.Group className="w-33 ml-24" controlId="formBasicEmail">
                            <Form.Label>Hospital Phone Number <span className="required"> *</span></Form.Label>
                            <Form.Control type="number" placeholder="Enter phone" value={stringValues.phoneNumber} name="phoneNumber" onChange={handleChange} />
                            <span className="error-label">{errors['phoneNumber']}</span>
                        </Form.Group>
                    </div>

                    <Form.Label>Hospital Category <span className="required"> *</span></Form.Label>
                    <div className="d-flex mb-32 mt-16">
                        <Form >
                            {['radio'].map((type) => (
                                <div key={`inline-${type}`} className="mb-3">
                                    {hospitalCategories.map((cat, j) => {
                                        return (
                                            <Form.Check
                                                inline
                                                label={cat}
                                                name={cat}
                                                type={type}
                                                value={cat}
                                                id={`inline-${type}-1`}
                                                className="qur-check"
                                                key={j}
                                                checked={stringValues.category === cat}
                                                onChange={handleCategory}
                                            />
                                        )
                                    })}
                                </div>
                            ))}
                        </Form>
                    </div>
                    <Form.Group className="w-50 " controlId="formBasicEmail">
                        <Form.Label>Hospital Address  <span className="required"> *</span></Form.Label>
                        <PlacesAutocomplete
                            value={addressLine}
                            onChange={handleChangeLocation}
                            onSelect={handleSelect}
                        >
                            {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                                <div className="g-address" >
                                    <input
                                        className="form-control"
                                        {...getInputProps({
                                            placeholder: 'Search Places ...'
                                        })}
                                    />
                                    <div className="">
                                        {loading && <div>Loading...</div>}
                                        {suggestions.map((suggestion, i) => {
                                            return (
                                                <div
                                                    {...getSuggestionItemProps(suggestion)}
                                                    key={i}
                                                >
                                                    <span>{suggestion.description}</span>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            )}
                        </PlacesAutocomplete>
                        <span className="error-label">{errors['addressLine']}</span>
                    </Form.Group>
                    <div className="flex-between mt-32">
                        <Form.Group className="w-25" controlId="formBasicEmail">
                            <Form.Label>City <span className="required"> *</span></Form.Label>
                            <Form.Control type="text" placeholder="Select City" value={stringValues.city} name="city" onChange={handleChange} />
                            <span className="error-label">{errors['city']}</span>
                        </Form.Group>
                        <Form.Group className="w-25 ml-24" controlId="formBasicEmail">
                            <Form.Label>State <span className="required"> *</span></Form.Label>
                            <Form.Control type="text" placeholder="Select State" value={stringValues.state} name="state" onChange={handleChange} />
                            <span className="error-label">{errors['state']}</span>
                        </Form.Group>
                        <Form.Group className="w-25 ml-24" controlId="formBasicEmail">
                            <Form.Label>Country <span className="required"> *</span></Form.Label>
                            <Form.Control type="text" placeholder="Select Country" value={stringValues.country} name="country" onChange={handleChange} />
                            <span className="error-label">{errors['country']}</span>
                        </Form.Group>
                        <Form.Group className="w-25 ml-24" controlId="formBasicEmail">
                            <Form.Label>Pincode <span className="required"> *</span></Form.Label>
                            <Form.Control type="text" placeholder="Pincode" value={stringValues.pincode} name="pincode" onChange={handleChange} />
                            <span className="error-label">{errors['pincode']}</span>
                        </Form.Group>
                    </div>
                    <div className="d-flex mt-32">
                        <div>
                            <Form.Label>Covid Treatment  <span className="required"> *</span></Form.Label>
                            <Form className="mt-8"  >
                                {['radio'].map((type) => (
                                    <div key={`inline-${type}`}>
                                        <Form.Check
                                            inline
                                            label={`Covid & Non Covid`}
                                            value={`Covid & Non Covid`}
                                            name="covidTreatment"
                                            onChange={handleChange}
                                            checked={stringValues.covidTreatment === `Covid & Non Covid`}
                                            type={type}
                                            id={`inline-${type}-1`}
                                            className="qur-check"
                                        />
                                        <Form.Check
                                            inline
                                            label="Non Covid"
                                            value="Non Covid"
                                            name="covidTreatment"
                                            onChange={handleChange}
                                            checked={stringValues.covidTreatment === "Non Covid"}
                                            type={type}
                                            id={`inline-${type}-2`}
                                            className="qur-check"
                                        />
                                        <Form.Check
                                            inline
                                            label="Covid Only"
                                            value="Covid Only"
                                            name="covidTreatment"
                                            onChange={handleChange}
                                            checked={stringValues.covidTreatment === "Covid Only"}
                                            type={type}
                                            id={`inline-${type}-3`}
                                            className="qur-check"
                                        />
                                    </div>
                                ))}
                            </Form>
                            <span className="error-label">{errors['covidTreatment']}</span>
                        </div>
                    </div>
                </Form>
            </div>
            <div className="maintitle mt-40 d-flex">
                <img src={"/images/basic_document.svg"} />
                <h3 className="ml-12">Upload Required Documents</h3>
            </div>
            <div className="px-5 mt-32">
                <Form.Label>{`DM & HO`} <span className="required"> *</span></Form.Label>
                <div className='form-group'  {...getRootPropsDMHO()}>
                    <input {...getInputPropsDMHO()} type='file' />
                    <div className='form-upload'>
                        <div className='form-upload-group'>
                            <div className='upload-title'>
                                <img src={"/images/upload-file.svg"} />
                                <div className="mt-8">
                                    <span>
                                        <a href='#' class="upload-link">Drag and drop images to upload</a>
                                        <p>or browse from your files</p>
                                        <Button variant="secondary" className="btn-sm mt-12">Select file</Button>
                                    </span>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <span style={{ display: 'block' }} className="error-label">{errors['dmHoDocUrl']}</span>
                {(dmHoDocFile || dmHoDocUrl) &&
                    <div className="upload-card w-25 mt-24">
                        <a href={dmHoDocUrl} target='_blank' rel='noopener noreferrer'>
                            {/* <a href={getProtectFile()} target='_blank' rel='noopener noreferrer'> */}
                            <div className="d-flex align-items-center">
                                <img src={"/images/xls-doc.svg"} alt='fileType' />
                                <p className="fs-14 ml-12">{dmHoDocFileName}</p>
                            </div>
                        </a>
                        <Button className="btn-no-brdr ml-80"><img src={"/images/delete-icon.svg"} alt='delete' onClick={() => openDeleteConfirmationModal(setDmHoDocUrl, setDmHoDocFile, setDmHoDocFileName)} /></Button>
                    </div>}
                {(dmHoDocFile && !dmHoDocUrl) && <Button className="btn-sm btn-tertiary text-cap mt-12" onClick={() => uploadDmHoDocFileToS3(dmHoDocFile)}>Upload file</Button>}
            </div>

            <div className="maintitle mt-40 d-flex">
                <img src={"/images/upload_hospital.svg"} />
                <h3 className="ml-12">Upload Hospital Images</h3>
            </div>

            <div className="px-5 mt-32">
                {(!hospitalThumbnailFile && !hospitalThumbnailUrl) ? <div className='form-group'>
                    <div className='form-upload form-ulpoad-thumbnail'>
                        <div className='form-upload-group'>
                            <img src={"/images/add_thumbnail.svg"} />
                            <div>
                                <a href='#' class="upload-link">Upload Image</a>
                                <p className="size">Max Size: 50kb</p>
                                <input type='file' accept='image/*' onChange={(e) => handleChooseFile(e)} />
                            </div>
                        </div>
                    </div>
                </div>
                    : (hospitalThumbnailFile || hospitalThumbnailUrl) && <div className='edit-image mt-12' >
                        <img src={hospitalThumbnailFile ? window.URL.createObjectURL(hospitalThumbnailFile) : hospitalThumbnailUrl} className='replace-img' alt='doctor' />
                        <div className='edit-image-block'>
                            <img src={"/images/replace-delete.svg"} className='mr-12' alt='delete doctor' onClick={() => openDeleteConfirmationModal(setHospitalThumbnailUrl, setHospitalThumbnailFile, null)} />
                        </div>
                    </div>}
                {(hospitalThumbnailFile && !hospitalThumbnailUrl) && <Button className="btn-sm btn-tertiary text-cap" onClick={() => uploadFileToS3(hospitalThumbnailFile, setHospitalThumbnailUrl)}>Start Uploading</Button>}

            </div>
            <div className="px-5 mt-32">
                <Form.Label>Gallery Images</Form.Label>
                <div className='form-group' {...getRootPropsGallery()}>
                    <input {...getInputPropsGallery()} type='file' accept="image/*" />
                    <div className='form-upload'>
                        <div className='form-upload-group'>
                            <div className='upload-title'>
                                <img src={"/images/upload-file.svg"} />
                                <div className="mt-8">
                                    <span>
                                        <a href='#' class="upload-link">Drag and drop documents to upload</a>
                                        <p>or browse from your files (Maximum file size 50 MB)</p>
                                        <Button variant="secondary" className="btn-sm mt-12">Select file</Button>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="uploaded-file-cards mt-12">
                    {galleryImages?.length > 0 ? galleryImages?.map((img, n) => {
                        return (
                            <div className='edit-image mt-12' key={n}>
                                <div className="upload-card flex-between mr-16">
                                    <img className='replace-img gallery-image' alt='doctor' src={img} />
                                    <img src={"/images/replace-delete.svg"} className='pl-120 cursor-pointer' alt='delete doctor' onClick={() => openDeleteConfirmationModalForGalleryImages(img, 'url')} />
                                </div>
                            </div>
                        )
                    }) : null}
                    {galleryImagesFiles?.length > 0 ? galleryImagesFiles?.map((img, m) => {
                        return (
                            <div className='edit-image mt-12' key={m}>
                                <div className="upload-card flex-between mr-16">
                                    <img className='replace-img gallery-image' alt='doctor' src={window.URL.createObjectURL(img)} />
                                    <img src={"/images/replace-delete.svg"} className='pl-120 cursor-pointer' alt='delete doctor' onClick={() => openDeleteConfirmationModalForGalleryImages(img, 'file')} />
                                </div>
                            </div>
                        )
                    }) : null}

                </div>
                {galleryImagesFiles?.length ? <Button className="btn-sm btn-tertiary text-cap" onClick={() => uploadGalleryImagesToS3()}>Start Uploading</Button> : null}

            </div>
            {!hospitalToEdit && (<div className="stepfooter">
                <Button className='btn btn-primary btn-lg' type='submit' disabled={false} onClick={handleSubmit}>Save & Continue</Button>
            </div>)}
            <DeleteConfirmationModal
                label={'Do you want to remove this file?'}
                heading={'Remove'}
                handleconfirmdelete={removeFile}
                show={modalShow}
                onHide={() => { setModalShow(false); setGalleryImageToDelete('') }}
            />
            {loading ? <Loader /> : null}
        </div>
    )

}
const mapStateToProps = (state) => ({
    hospitalDetails: state.HospitalDetails
})

const mapActionToProps = (dispatch) => {
    return bindActionCreators({
        postHospitalBasicDetailsRequest: Actions.postHospitalBasicDetailsRequest,
        getHospitalBasicDetailsRequest: Actions.getHospitalBasicDetailsRequest,
        updateHospitalBasicDetailsRequest: Actions.updateHospitalBasicDetailsRequest,
    },
        dispatch
    )
}
export default connect(mapStateToProps, mapActionToProps)(Firststep);