import { KeyboardArrowLeft } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { Backdrop, Button, Chip, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, Grid, InputLabel, LinearProgress, MenuItem, Select, TextField, Typography } from '@mui/material';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getFoodLogsPersonal, getNutrients, saveDetailedFoodLog } from '../auth/APIServices';
import { addPp } from '../auth/GamificationAPI';

const DetailedFoodLog = (props) => {
    // Recommended values
    const recommendedCarbs = 300;
    const recommendedFat = 65;
    const recommendedProtein = 50;

    // Modal states
    const [open, setOpen] = useState(false);
    const [modalHeading, setModalHeading] = useState("");
    const [modalBody, setModalBody] = useState("");

    // Chip highlighting state
    const [checked, setChecked] = useState([0]);

    // Measurement unit item object state
    const [currentUnit, setCurrentUnit] = useState();

    // Initial form state
    const initialState = {
        servingQty: 1,
        foodName: "",
        servingDescription: "",
        photosUrl: "",
        mealType: "",
        baseCalories: "",
        servingUnit: "",
        totalWeight: "",
        calorieBudget: "",
    }

    // Form state
    const [formData, setFormData] = useState(initialState);

    // Nutrient state for the food fetched from DB
    const [nutrients, setNutrients] = useState();

    // Calorie budget state
    const [calorieBudget, setCalorieBudget] = useState();

    // Navigation
    const navigate = useNavigate();

    // Chip options state
    const mealTypes = [
        { mealId: 1, label: "Breakfast" },
        { mealId: 2, label: "Lunch" },
        { mealId: 3, label: "Dinner" },
        { mealId: 4, label: "Snack" }
    ];

    // State for modal content
    const [dialogHead, setDialogHead] = useState();
    const [dialogBody, setDialogBody] = useState();
    const [openSuccess, setOpenSuccess] = React.useState(false);



    // State for summary values of nutrients (aggregates)
    const [summaryValues, setSummaryValues] = useState();

    // Loading states
    const [loading, setLoading] = useState(true);
    const [loadingButton, setLoadingButton] = useState(false);

    // Handle saving journal entry
    const handleSave = async () => {
        // Make the save button display a loading symbol
        setLoadingButton(true);

        const body = {
            mealType: formData.mealType,
            diaryType: "detailed",
            foodId: nutrients.ingredients[0].parsed[0].foodId,
            foodName: nutrients.ingredients[0].parsed[0].food,
            servingUnit: formData.servingUnit,
            servingQty: formData.servingQty,
            caloriesPerUnit: formData.baseCalories,
            carbs: nutrients.totalNutrients.CHOCDF.quantity * formData.servingQty,
            protein: nutrients.totalNutrients.PROCNT.quantity * formData.servingQty,
            fat: nutrients.totalNutrients.FAT.quantity * formData.servingQty,
            sodium: nutrients.totalNutrients.NA.quantity * formData.servingQty,
            weightInG: nutrients.totalWeight
        }

        // Level up if pp expands beyond boundary
        if ((props.pp + 5) / props.ppBoundary * 100 >= 100) {
            // Save old level
            const oldLevel = props.account.levelId;

            props.setAccount({
                ...props.account,
                levelId: props.account.levelId + 1
            })
            console.log((props.pp + 5) - props.ppBoundary)
            props.setPp((props.pp + 5) - props.ppBoundary);
            console.log(props.ppBoundary + 5)

            props.setPpBoundary(props.ppBoundary + 5)
            setDialogHead('Your pet leveled up');
            setDialogBody('Graaape, now your pet is even more excited 🍇🍇🍇.')
            setOpenSuccess(true);

            addPp((props.pp + 5) - props.ppBoundary, props.ppBoundary, oldLevel + 1)
            const response = await saveDetailedFoodLog(body);


            if (response === 200) {
                setOpen(true);
                setModalHeading("Note saved!")
                setModalBody("The note you created has been successfully saved. Plus 5 progress points 😻");
                setTimeout(() => {
                    navigate('/app/food/search');
                }, 2000);
            } else if (response === 400) {
                setOpen(true);
                setModalHeading("Incorrect or incomplete input")
                setModalBody("Please make sure that you have completely filled up all required fields.")
                setLoadingButton(false);
            } else if (response === 500) {
                setOpen(true);
                setModalHeading("Server error")
                setModalBody("Oops! Something wrong happened on our end. Please try again later.")
                setLoadingButton(false);

            } else {
                setOpen(true);
                setModalHeading("Something wrong happened")
                setModalBody("We're not sure what happened, but we're at it to fix it.")
                setLoadingButton(false);

            }

            return


        }
        props.setPp(props.pp + 5, props.ppBoundary)
        addPp(props.pp + 5, props.ppBoundary, props.account.levelId)
        const response = await saveDetailedFoodLog(body);
        if (response === 200) {
            setOpen(true);
            setModalHeading("Note saved!")
            setModalBody("The note you created has been successfully saved. Plus 5 progress points 😻");
            setTimeout(() => {
                navigate('/app/food/search');
            }, 5000);
        } else if (response === 400) {
            setOpen(true);
            setModalHeading("Incorrect or incomplete input")
            setModalBody("Please make sure that you have completely filled up all required fields.")
            setLoadingButton(false);
        } else if (response === 500) {
            setOpen(true);
            setModalHeading("Server error")
            setModalBody("Oops! Something wrong happened on our end. Please try again later.")
            setLoadingButton(false);

        } else {
            setOpen(true);
            setModalHeading("Something wrong happened")
            setModalBody("We're not sure what happened, but we're at it to fix it.")
            setLoadingButton(false);

        }
    }

    const handleToggle = (value) => {
        const newChecked = [];
        newChecked.push(value.mealId);
        setChecked(newChecked);
        setFormData({
            ...formData,
            mealType: mealTypes[newChecked[0] - 1].label.toLowerCase()
        })
    };

    const handleInputChange = (event) => {
        const target = event.target;
        setFormData({
            ...formData,
            [target.name]: target.value
        })

        if (target.name === "servingUnit") {
            const filteredArray = props.units.filter((measure) => {
                return measure.label === target.value;
            })
            setCurrentUnit(filteredArray);
        }
    }

    // Handle clicking dialog close
    const handleDialogClose = () => {
        setOpen(false);
    }


    // !! Fix this wrong implementation of hooks/useEffect !!
    // Fetching and setting after first render
    useEffect(() => {
        // Return to previous page if units prop weren't passed from the previous component
        if (props.units === undefined) {
            return navigate('/app/food/search');
        }

        (async () => {
            // Fetch nutrients for first measurement unit in the units list
            const fetchedNutrients = await getNutrients(props.units[0].uri, props.foodItem.food.foodId);

            // Set nutrients state to the fetched data above
            setNutrients(fetchedNutrients);
        })()
        // Fix this useEffect problem
        // eslint-disable-next-line
    }, [])


    // Fetch and set summary data and base calories and totalWeight of food item
    useEffect(() => {
        if (nutrients === undefined) {
            return;
        }


        console.log(nutrients)

        // Set base calories of the food item to form state
        setFormData(formData => ({
            ...formData,
            baseCalories: nutrients.calories,
            totalWeight: nutrients.totalWeight,
        }));

        // Prevents fetching repeatedly
        if (summaryValues !== undefined) {
            setLoading(false);
            return;
        }

        (async () => {
            // Fetch all logs from today for the current user
            const logs = await getFoodLogsPersonal(moment().format('YYYY'), moment().format('MM'), moment().format('DD'));
            console.log(logs)

            // Calculate all calories, carbs, protein, fat, and sodium from those meals
            const calorieTotalFromLogs = logs[0].reduce((prev, current) => {
                return prev + current.caloriesPerUnit * current.servingQty;
            }, 0);

            const carbsTotalFromLogs = logs[0].reduce((prev, current) => {
                return prev + current.carbs;
            }, 0);

            const proteinTotalFromLogs = logs[0].reduce((prev, current) => {
                return prev + current.protein;
            }, 0);

            const fatTotalFromLogs = logs[0].reduce((prev, current) => {
                return prev + current.fat;
            }, 0);

            /*const sodiumTotalFromLogs = logs[0].reduce((prev, current) => {
                return prev + current.sodium;
            }, 0); */

            // Set summary values
            setSummaryValues({
                calories: calorieTotalFromLogs,
                carbs: carbsTotalFromLogs,
                protein: proteinTotalFromLogs,
                fat: fatTotalFromLogs
            })

            // Set calorie budget
            setCalorieBudget(logs[1][0].calorieBudget)

        })();
        // Fix this useEffect problem
        // eslint-disable-next-line
    }, [nutrients]);

    // Turn off loading state when summary values and form data have been updated
    useEffect(() => {
        if (formData === undefined || summaryValues === undefined || calorieBudget === undefined) {
            return;
        }
        console.log(calorieBudget)
        setLoading(false);
    }, [formData, summaryValues, calorieBudget])

    // Fetch new data and set on change of serving unit
    useEffect(() => {
        console.log(currentUnit)

        // Set initial serving unit if currentUnit doesn't exist
        if (currentUnit === undefined) {
            setFormData(formData => ({
                ...formData,
                servingUnit: props.units[0].label
            }))
            return;
        }

        // Fetch data only if summary values are not undefined
        if (summaryValues === undefined) {
            return;
        }

        // Fetch new data
        (async () => {
            // Fetch nutrients for first measurement unit in the units list
            setLoading(true);
            const fetchedNutrients = await getNutrients(currentUnit[0].uri, props.foodItem.food.foodId);
            console.log(fetchedNutrients)
            // Set nutrients state to the fetched data above
            setNutrients(fetchedNutrients);
        })()
        // Fix this useEffect problem
        // eslint-disable-next-line
    }, [currentUnit]);

    useEffect(() => {
        console.log(formData)
    }, [formData])

    useEffect(() => {
        console.log(summaryValues)
    }, [summaryValues])




    return (
        <div>
            {loading ?
                <Grid container direction="column" sx={{ height: '100vh' }} alignItems="center" justifyContent="center">
                    <CircularProgress variant='indeterminate' sx={{ mb: '2em' }} />
                    <Typography variant="p">Loading content</Typography>
                </Grid>
                :
                <Grid container direction="column">
                    < Grid item xs={12}
                        container direction='column' sx={{ background: '#F9AB10', p: '1em', mb: '1em' }
                        }
                    >
                        <Button className='button-quicknote' variant='text' sx={{ color: 'black' }} startIcon={<KeyboardArrowLeft />} onClick={() => { navigate('/app/food/search') }}>Back</Button>
                        <Grid container justifyContent="space-between" alignItems="center">
                            <Grid item> <Typography variant="onboardingHeader2" component="h1">{props.foodItem.food.label}</Typography  ></Grid>
                            <Grid item>
                                <LoadingButton color='secondary' className='button-foodlog' variant='contained' onClick={handleSave} loading={loadingButton}>Save</LoadingButton></Grid>

                        </Grid>
                    </Grid>
                    {/*  <Grid item xs={12} container rowSpacing={4}>
                        <img alt='Confetti' src={require('../../assets/img/sideview-beagle.png')} width='200px' height='200px' margin='auto' />

                        <p>Please stop eating already</p>
                    </Grid>*/}

                    <Grid item px="1em">
                        <Typography variant="categorySubheader" component="h2">What's this meal for?</Typography>
                    </Grid>
                    <Grid item xs={12} container direction="row" px="1em" mb="2em">
                        {mealTypes.map((meal) => {
                            return (
                                <Chip sx={{ mr: '.5em' }} key={meal.mealId} label={meal.label} onClick={(event) => { handleToggle(meal) }} variant={checked.indexOf(meal.mealId) !== -1 ? "filled" : "outlined"} />
                            )
                        })}
                    </Grid>

                    < Grid item container direction="column" px="1em">
                        <Grid item mb="1em">
                            <Typography variant="categorySubheader" component="h2">Serving</Typography>
                        </Grid>

                        <Grid item xs={12}>
                            <Grid container direction="row" justifyContent="flex-start" sx={{ mb: '2em' }}>
                                <Grid item xs={3} mr={2}>
                                    <TextField id="filled-basic" variant='filled' type="number" value={formData.servingQty} name="servingQty" onChange={handleInputChange} fullWidth />
                                </Grid>

                                <Grid item xs={3}>
                                    <FormControl sx={{ minWidth: '5em' }}>
                                        <InputLabel id="serving-unit-label">Serving Unit</InputLabel>
                                        <Select
                                            labelId="serving-unit-label"
                                            id="serving-unit-select"
                                            value={formData.servingUnit}
                                            label="Serving Unit"
                                            onChange={handleInputChange}
                                            name="servingUnit"
                                            fullWidth
                                        >
                                            {props.units.map((value) => (
                                                <MenuItem key={value.label} value={value.label}>{value.label}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>
                            </Grid>

                        </Grid>


                        <Grid item md={12}>
                            <Grid item mb="1em">
                                <Typography variant="categorySubheader" component="h2">Weight in grams</Typography>
                            </Grid>                            <Typography variant="p">{formData.totalWeight + " g"}</Typography>
                        </Grid>

                        <Grid item md={12}>
                            <Grid item mb="1em">
                                <Typography variant="categorySubheader" component="h2">Amount of calories</Typography>
                            </Grid>                            <Typography variant="p">{formData.servingQty <= 0 || formData.servingQty === undefined ? 0 :
                                Math.round(formData.baseCalories * formData.servingQty) + " calories"}</Typography>
                        </Grid>

                        <Grid item container md={12} direction="column" sx={{ borderRadius: '20px', background: '#E7DDC9', padding: '1em' }}>
                            <Grid item md={12} mb={2}>
                                <Typography variant="subtitle1" component="h2">Context</Typography>
                            </Grid>

                            <Grid item md={12}>
                                <LinearProgress sx={{ borderRadius: '20px', height: '1em', mb: '1em' }} variant='determinate' value={((formData.baseCalories * formData.servingQty) + summaryValues.calories) / calorieBudget * 100} color={((formData.baseCalories * formData.servingQty) + summaryValues.calories) / calorieBudget * 100 > 100 ? 'red' : 'primary'} />
                            </Grid>

                            <Grid item md={12}>
                                <Typography variant="p" component="p">{`Remaining budget: ${calorieBudget - ((formData.baseCalories * formData.servingQty) + summaryValues.calories)} cal`}</Typography>
                            </Grid>

                            <Grid item md={12}>
                                <Typography variant="p" component="p">You’d {(((formData.baseCalories * formData.servingQty) + summaryValues.calories) / calorieBudget * 100) > 100 ? "exceed" : "be within"} your calorie budget if you eat this amount.</Typography>
                            </Grid>

                            <Grid item md={12} container paddingY={2} spacing={5} justifyContent="center">
                                <Grid item xs={4} container direction="column">
                                    <LinearProgress sx={{ mb: '.5em', borderRadius: '20px', height: '.5em' }} variant='determinate' value={nutrients.totalNutrients.CHOCDF !== undefined ? (summaryValues.carbs + nutrients.totalNutrients.CHOCDF.quantity * formData.servingQty) / recommendedCarbs * 100 : (summaryValues.carbs) / recommendedCarbs * 100} color={nutrients.totalNutrients.CHOCDF !== undefined ? (summaryValues.carbs + nutrients.totalNutrients.CHOCDF.quantity * formData.servingQty) / recommendedCarbs * 100 > 100 ? 'red' : 'primary' : (summaryValues.carbs) / recommendedCarbs * 100 > 100 ? 'red' : 'primary'} />
                                    <Typography component="p" alignSelf="center">Carbs</Typography>
                                </Grid>
                                <Grid item xs={4} container direction="column">
                                    <LinearProgress sx={{ mb: '.5em', borderRadius: '20px', height: '.5em' }} variant='determinate' value={nutrients.totalNutrients.FAT !== undefined ? (summaryValues.fat + nutrients.totalNutrients.FAT.quantity * formData.servingQty) / recommendedFat * 100 : (summaryValues.fat) / recommendedFat * 100} color={nutrients.totalNutrients.FAT !== undefined ? (summaryValues.fat + nutrients.totalNutrients.FAT.quantity * formData.servingQty) / recommendedFat * 100 > 100 ? 'red' : 'primary' : (summaryValues.fat) / recommendedFat * 100 > 100 ? 'red' : 'primary'} />
                                    <Typography component="p" alignSelf="center">Fat</Typography>

                                </Grid>
                                <Grid item xs={4} container direction="column">

                                    <LinearProgress sx={{ mb: '.5em', borderRadius: '20px', height: '.5em' }} variant='determinate' value={nutrients.totalNutrients.PROCNT !== undefined ? (summaryValues.protein + nutrients.totalNutrients.PROCNT.quantity * formData.servingQty) / recommendedProtein * 100 : (summaryValues.protein) / recommendedProtein * 100} color={nutrients.totalNutrients.PROCNT !== undefined ? (summaryValues.protein + nutrients.totalNutrients.PROCNT.quantity * formData.servingQty) / recommendedProtein * 100 > 100 ? 'red' : 'primary' : (summaryValues.protein) / recommendedProtein * 100 > 100 ? 'red' : 'primary'} />
                                    <Typography component="p" alignSelf="center">Protein</Typography>

                                </Grid>
                            </Grid>
                        </Grid>

                    </Grid>

                    <Dialog
                        open={open}
                        onClose={handleDialogClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">
                            {modalHeading}
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                {modalBody}
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => { handleDialogClose() }}>Okay</Button>
                        </DialogActions>
                    </Dialog>
                </Grid>
            }
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={openSuccess}
                onClick={() => { setOpenSuccess(false) }}>

                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <img alt='Confetti' src={require('../../assets/img/3d-confetti.png')} width='200px' height='200px' margin='auto' />
                    </Grid>
                    <Grid item xs={12}>
                        <h1>{dialogHead}</h1>
                    </Grid>
                    <Grid item xs={12}>
                        <p>{dialogBody}</p>
                    </Grid>
                </Grid>
            </Backdrop>
        </div >
    );
}

export default DetailedFoodLog;
