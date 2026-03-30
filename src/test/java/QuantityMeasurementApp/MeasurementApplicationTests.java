package QuantityMeasurementApp;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;
import org.springframework.boot.test.context.SpringBootTest;


//@SpringBootTest
class MeasurementApplicationTests {
    @Test
    void testFeetEquality_SameValue() {
        MeasurementApplication.Feet f1 = new MeasurementApplication.Feet(89.6);
        MeasurementApplication.Feet f2 = new MeasurementApplication.Feet(89.6);
        assertEquals(f1, f2);
    }

    @Test
    void testFeetInEquality_DifferValue() {
        MeasurementApplication.Feet f1 = new MeasurementApplication.Feet(89.6);
        MeasurementApplication.Feet f2 = new MeasurementApplication.Feet(34.6);
        assertNotEquals(f1, f2);
    }

    @Test
    void testFeetNullable_NullValue() {
        MeasurementApplication.Feet f1 = new MeasurementApplication.Feet(55.0);
        assertFalse(f1.equals(null));
    }

    @Test
    void testFeetEquality_ClassComparison(){
        MeasurementApplication.Feet f1 = new MeasurementApplication.Feet(89.6);

        assertFalse(f1.equals("Some String"));
    }
    @Test
    void testFeetEquality_SameReference(){
        MeasurementApplication.Feet f1 = new MeasurementApplication.Feet(89.6);

        assertTrue(f1.equals(f1));
    }

    @Test
    void contextLoads() {
    }

}