import React, { useState, useEffect } from "react";
import { TouchableOpacity, Text, View, StyleSheet, ScrollView } from 'react-native';
import { Picker as SelectPicker } from '@react-native-picker/picker';
import Feather from 'react-native-vector-icons/Feather';

const Pagination = ({ postsPerPage, totalPosts, paginate, showPages, postsPerPages }) => {
    const [purposeData, setPurposeData] = useState([{ type: "20", id: "1" }, { type: "50", id: "2" }, { type: "100", id: "3" }]);

    const [purposeIndexValue, setPurposeIndexValue] = useState("")
    const [purposeName, setpurposeName] = useState(20)
    const [disble, setdisble] = useState(false)
    const [count, setcount] = useState(1)

    console.log("postsPerPages ;- ", postsPerPages)


    const pageNumbers = [];



    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumbers.push(i);
    }

    console.log("pageNumbers ;- ", pageNumbers)


    const onPickerValue = (value, index) => {
        setPurposeIndexValue(value)
        setdisble(true)
        // setpurposeName(Number(purposeData[index - 1].type))

        postsPerPages(Number(purposeData[index - 1].type))

        console.log(value, index, "purposeName :- ", purposeName, ", ", )
        console.log("pageNumbers :- ",pageNumbers[index])
    }


    const getNumberLess = () => {

        if (count === 1) {
            setcount(count)
            paginate(count)
            // alert("Less " + count)
        } else {
            setcount(count - 1)

            paginate(count - 1)
            // alert("Less " + count)
        }

        // paginate(count)



    }


    const getNumber = () => {
        if (count === pageNumbers.length) {
            setcount(count)
            paginate(count)
            // alert("Greater " + count)
        } else {
            setcount(count + 1)
            paginate(count + 1)
            // alert("Greater " + count)
        }

    }




    return (
        <View style={styles.container}>
            {showPages ? (
                <>



                    {/* <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}> */}

                    <View style={styles.pagination}>

                        <TouchableOpacity style={styles.leftI} onPress={() => getNumberLess()}>
                            <Feather
                                name="chevrons-left"
                                color="#FF5733"
                                size={35}

                            />
                        </TouchableOpacity>



                        <View style={styles.pkr}>
                            <SelectPicker
                                style={{ width: '100%' }}
                                selectedValue={purposeIndexValue}
                                onValueChange={(value, index) => {
                                    onPickerValue(value, index);
                                }}>
                                <SelectPicker.item
                                    label="Page size"
                                    color="#6f6f6f"
                                    value="0"
                                    enabled={disble ? false : true}
                                />
                                {purposeData.map((item, i) => (
                                    <SelectPicker.item label={item.type} color="#000" value={item.id} />
                                ))}
                            </SelectPicker>
                        </View>





                        {/* {pageNumbers.map((number) => (
                                <View style={styles.page_item}>
                                    <TouchableOpacity onPress={() => paginate(number)} style={styles.page_link}>
                                        <Text style={{ margin: 10 }}>
                                            {number}
                                        </Text>
                                    </TouchableOpacity>
                                </View>

                            ))} */}



                        <TouchableOpacity style={styles.leftI} onPress={() => getNumber()}>
                            <Feather
                                name="chevrons-right"
                                color="#FF5733"
                                size={35}
                                style={styles.leftI}
                            />
                        </TouchableOpacity>







                    </View>
                    {/* </ScrollView> */}

                    {pageNumbers.map((item, i) => {
                        console.log("page number :- ", item.toString(), ", ", i + 1)
                    })}




                </>

            ) : null}


            {/* <View
                style={{
                    paddingHorizontal: 5,
                    paddingVertical: 8,
                }}>
                <TouchableOpacity
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                    <Text>In Association with </Text>
                    <Text style={{ color: '#f68823' }}> Refread</Text>
                </TouchableOpacity>
            </View> */}


        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        marginLeft: "5%",
        marginRight: "5%"
    },
    pagination: {
        // flex: 1,
        flexDirection: "row",
        // width: "100%",
        marginBottom: "10%",

        paddingVertical: 10,
        justifyContent: "space-between"



    },
    page_link: {
        // width: "100%",
        color: "#0d6efd",
        // borderWidth: 1,
        borderBottomWidth: 1,
        borderBottomColor: "#FF3A00"


    },
    page_item: {
        // width:"100%",
        // backgroundColor: "red",
        margin: 5,
        marginRight: 15
    },
    pkr: {
        width: '68%',
        marginTop: 8,
        // marginLeft: 20,
        // marginRight: 20,
        // borderWidth:1,
        // borderColor: 'black',
        borderRadius: 5,
        alignSelf: 'center',
        backgroundColor: '#f3f3f3',
        marginRight: "5%",
        marginLeft: "5%"
    },
    leftI: {
        marginTop: "5%",
        marginRight: 5
    }
});

export default Pagination;
