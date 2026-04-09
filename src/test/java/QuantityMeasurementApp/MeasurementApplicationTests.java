package QuantityMeasurementApp;

import com.quantity.measurement.enums.LengthUnit;
import com.quantity.measurement.model.QuantityLength;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class MeasurementApplicationTests {
    //UC4

    // 1
    @Test
    void testEquality_YardToYard_SameValue() {
        assertEquals(
                new QuantityLength(1.0, LengthUnit.YARDS),
                new QuantityLength(1.0, LengthUnit.YARDS)
        );
    }

    // 2
    @Test
    void testEquality_YardToYard_DifferentValue() {
        assertNotEquals(
                new QuantityLength(1.0, LengthUnit.YARDS),
                new QuantityLength(2.0, LengthUnit.YARDS)
        );
    }

    // 3
    @Test
    void testEquality_YardToFeet_EquivalentValue() {
        assertEquals(
                new QuantityLength(1.0, LengthUnit.YARDS),
                new QuantityLength(3.0, LengthUnit.FEET)
        );
    }

    // 4
    @Test
    void testEquality_FeetToYard_EquivalentValue() {
        assertEquals(
                new QuantityLength(3.0, LengthUnit.FEET),
                new QuantityLength(1.0, LengthUnit.YARDS)
        );
    }

    // 5
    @Test
    void testEquality_YardToInches_EquivalentValue() {
        assertEquals(
                new QuantityLength(1.0, LengthUnit.YARDS),
                new QuantityLength(36.0, LengthUnit.INCH)
        );
    }

    // 6
    @Test
    void testEquality_InchesToYard_EquivalentValue() {
        assertEquals(
                new QuantityLength(36.0, LengthUnit.INCH),
                new QuantityLength(1.0, LengthUnit.YARDS)
        );
    }

    // 7
    @Test
    void testEquality_YardToFeet_NonEquivalentValue() {
        assertNotEquals(
                new QuantityLength(1.0, LengthUnit.YARDS),
                new QuantityLength(2.0, LengthUnit.FEET)
        );
    }

    // 8
    @Test
    void testEquality_CentimetersToInches_EquivalentValue() {
        assertEquals(
                new QuantityLength(1.0, LengthUnit.CENTIMETERS),
                new QuantityLength(0.393701, LengthUnit.INCH)
        );
    }

    // 9
    @Test
    void testEquality_CentimetersToFeet_NonEquivalentValue() {
        assertNotEquals(
                new QuantityLength(1.0, LengthUnit.CENTIMETERS),
                new QuantityLength(1.0, LengthUnit.FEET)
        );
    }

    // 10 (Transitive property)
    @Test
    void testEquality_MultiUnit_TransitiveProperty() {
        QuantityLength yard = new QuantityLength(1.0, LengthUnit.YARDS);
        QuantityLength feet = new QuantityLength(3.0, LengthUnit.FEET);
        QuantityLength inch = new QuantityLength(36.0, LengthUnit.INCH);

        assertEquals(yard, feet);
        assertEquals(feet, inch);
        assertEquals(yard, inch);
    }

    // 11
    @Test
    void testEquality_YardWithNullUnit() {
        assertThrows(IllegalArgumentException.class, () -> {
            new QuantityLength(1.0, null);
        });
    }

    // 12 (Reflexive)
    @Test
    void testEquality_YardSameReference() {
        QuantityLength q = new QuantityLength(1.0, LengthUnit.YARDS);
        assertEquals(q, q);
    }

    // 13
    @Test
    void testEquality_YardNullComparison() {
        QuantityLength q = new QuantityLength(1.0, LengthUnit.YARDS);
        assertNotEquals(q, null);
    }

    // 14
    @Test
    void testEquality_CentimetersWithNullUnit() {
        assertThrows(IllegalArgumentException.class, () -> {
            new QuantityLength(1.0, null);
        });
    }

    // 15 (Reflexive)
    @Test
    void testEquality_CentimetersSameReference() {
        QuantityLength q = new QuantityLength(1.0, LengthUnit.CENTIMETERS);
        assertEquals(q, q);
    }

    // 16
    @Test
    void testEquality_CentimetersNullComparison() {
        QuantityLength q = new QuantityLength(1.0, LengthUnit.CENTIMETERS);
        assertNotEquals(q, null);
    }

    // 17 (Complex multi-unit)
    @Test
    void testEquality_AllUnits_ComplexScenario() {
        QuantityLength yard = new QuantityLength(2.0, LengthUnit.YARDS);
        QuantityLength feet = new QuantityLength(6.0, LengthUnit.FEET);
        QuantityLength inch = new QuantityLength(72.0, LengthUnit.INCH);

        assertEquals(yard, feet);
        assertEquals(feet, inch);
        assertEquals(yard, inch);
    }

    //UC5
    // 1 (Feet → Inches)
    @Test
    void testConversion_FeetToInches() {
        assertEquals(12.0,
                QuantityLength.convert(1.0, LengthUnit.FEET, LengthUnit.INCH));
    }

    // 2 (Inches → Feet)
    @Test
    void testConversion_InchesToFeet() {
        assertEquals(2.0,
                QuantityLength.convert(24.0, LengthUnit.INCH, LengthUnit.FEET));
    }

    // 3 (Yards → Inches)
    @Test
    void testConversion_YardsToInches() {
        assertEquals(36.0,
                QuantityLength.convert(1.0, LengthUnit.YARDS, LengthUnit.INCH));
    }

    // 4 (Inches → Yards)
    @Test
    void testConversion_InchesToYards() {
        assertEquals(2.0,
                QuantityLength.convert(72.0, LengthUnit.INCH, LengthUnit.YARDS));
    }

    // 5 (Centimeters → Inches with precision)
    @Test
    void testConversion_CentimetersToInches() {
        assertEquals(1.0,
                QuantityLength.convert(2.54, LengthUnit.CENTIMETERS, LengthUnit.INCH),
                1e-6);
    }

    // 6 (Feet → Yards)
    @Test
    void testConversion_FeetToYards() {
        assertEquals(2.0,
                QuantityLength.convert(6.0, LengthUnit.FEET, LengthUnit.YARDS));
    }

    // 7 (Zero value)
    @Test
    void testConversion_ZeroValue() {
        assertEquals(0.0,
                QuantityLength.convert(0.0, LengthUnit.FEET, LengthUnit.INCH));
    }

    // 8 (Negative value)
    @Test
    void testConversion_NegativeValue() {
        assertEquals(-12.0,
                QuantityLength.convert(-1.0, LengthUnit.FEET, LengthUnit.INCH));
    }

    // 9 (Round-trip conversion)
    @Test
    void testConversion_RoundTrip() {
        double original = 5.0;

        double converted = QuantityLength.convert(original, LengthUnit.FEET, LengthUnit.INCH);
        double back = QuantityLength.convert(converted, LengthUnit.INCH, LengthUnit.FEET);

        assertEquals(original, back, 1e-6);
    }

    // 10 (Invalid unit → null)
    @Test
    void testConversion_InvalidUnit_Throws() {
        assertThrows(IllegalArgumentException.class, () ->
                QuantityLength.convert(1.0, null, LengthUnit.FEET));
    }

    // 11 (NaN or Infinite values)
    @Test
    void testConversion_NaNOrInfinite_Throws() {
        assertThrows(IllegalArgumentException.class, () ->
                QuantityLength.convert(Double.NaN, LengthUnit.FEET, LengthUnit.INCH));

        assertThrows(IllegalArgumentException.class, () ->
                QuantityLength.convert(Double.POSITIVE_INFINITY, LengthUnit.FEET, LengthUnit.INCH));
    }

    // 12 (Precision tolerance across multiple conversions)
    @Test
    void testConversion_PrecisionTolerance() {
        double result = QuantityLength.convert(1.0, LengthUnit.CENTIMETERS, LengthUnit.FEET);
        double expected = 0.0328084;

        assertEquals(expected, result, 1e-6);
    }
    // ===============================
// UC6 TEST CASES (12)
// ===============================

    // Test Case 1 (Same unit: Feet + Feet)
    @Test
    void testAddition_SameUnit_FeetPlusFeet() {
        QuantityLength q1 = new QuantityLength(1.0, LengthUnit.FEET);
        QuantityLength q2 = new QuantityLength(2.0, LengthUnit.FEET);

        QuantityLength result = q1.add(q2);

        assertEquals(new QuantityLength(3.0, LengthUnit.FEET), result);
    }

    // Test Case 2 (Same unit: Inch + Inch)
    @Test
    void testAddition_SameUnit_InchPlusInch() {
        QuantityLength q1 = new QuantityLength(6.0, LengthUnit.INCH);
        QuantityLength q2 = new QuantityLength(6.0, LengthUnit.INCH);

        QuantityLength result = q1.add(q2);

        assertEquals(new QuantityLength(12.0, LengthUnit.INCH), result);
    }

    // Test Case 3 (Cross unit: Feet + Inches → Feet)
    @Test
    void testAddition_CrossUnit_FeetPlusInches() {
        QuantityLength feet = new QuantityLength(1.0, LengthUnit.FEET);
        QuantityLength inch = new QuantityLength(12.0, LengthUnit.INCH);

        QuantityLength result = feet.add(inch);

        assertEquals(new QuantityLength(2.0, LengthUnit.FEET), result);
    }

    // Test Case 4 (Cross unit: Inch + Feet → Inch)
    @Test
    void testAddition_CrossUnit_InchPlusFeet() {
        QuantityLength inch = new QuantityLength(12.0, LengthUnit.INCH);
        QuantityLength feet = new QuantityLength(1.0, LengthUnit.FEET);

        QuantityLength result = inch.add(feet);

        assertEquals(new QuantityLength(24.0, LengthUnit.INCH), result);
    }

    // Test Case 5 (Cross unit: Yard + Feet → Yard)
    @Test
    void testAddition_CrossUnit_YardPlusFeet() {
        QuantityLength yard = new QuantityLength(1.0, LengthUnit.YARDS);
        QuantityLength feet = new QuantityLength(3.0, LengthUnit.FEET);

        QuantityLength result = yard.add(feet);

        assertEquals(new QuantityLength(2.0, LengthUnit.YARDS), result);
    }

    // Test Case 6 (Cross unit: CM + Inch → CM)
    @Test
    void testAddition_CrossUnit_CentimeterPlusInch() {
        QuantityLength cm = new QuantityLength(2.54, LengthUnit.CENTIMETERS);
        QuantityLength inch = new QuantityLength(1.0, LengthUnit.INCH);

        QuantityLength result = cm.add(inch);

        assertEquals(new QuantityLength(5.08, LengthUnit.CENTIMETERS), result);
    }

    // Test Case 7 (Commutativity)
    @Test
    void testAddition_Commutativity() {
        QuantityLength A = new QuantityLength(1.0, LengthUnit.FEET);
        QuantityLength B = new QuantityLength(12.0, LengthUnit.INCH);

        QuantityLength result1 = A.add(B);
        QuantityLength result2 = B.add(A);

        assertTrue(result1.equals(result2));
    }

    // Test Case 8 (Identity: +0)
    @Test
    void testAddition_WithZero() {
        QuantityLength q1 = new QuantityLength(5.0, LengthUnit.FEET);
        QuantityLength zero = new QuantityLength(0.0, LengthUnit.INCH);

        QuantityLength result = q1.add(zero);

        assertEquals(new QuantityLength(5.0, LengthUnit.FEET), result);
    }

    // Test Case 9 (Negative values)
    @Test
    void testAddition_NegativeValues() {
        QuantityLength q1 = new QuantityLength(5.0, LengthUnit.FEET);
        QuantityLength q2 = new QuantityLength(-2.0, LengthUnit.FEET);

        QuantityLength result = q1.add(q2);

        assertEquals(new QuantityLength(3.0, LengthUnit.FEET), result);
    }

    // Test Case 10 (Null operand)
    @Test
    void testAddition_NullSecondOperand() {
        QuantityLength q1 = new QuantityLength(1.0, LengthUnit.FEET);

        assertThrows(IllegalArgumentException.class, () -> q1.add(null));
    }

    // Test Case 11 (Large values)
    @Test
    void testAddition_LargeValues() {
        QuantityLength q1 = new QuantityLength(1e6, LengthUnit.FEET);
        QuantityLength q2 = new QuantityLength(1e6, LengthUnit.FEET);

        QuantityLength result = q1.add(q2);

        assertEquals(new QuantityLength(2e6, LengthUnit.FEET), result);
    }

    // Test Case 12 (Small values)
    @Test
    void testAddition_SmallValues() {
        QuantityLength q1 = new QuantityLength(0.001, LengthUnit.FEET);
        QuantityLength q2 = new QuantityLength(0.002, LengthUnit.FEET);

        QuantityLength result = q1.add(q2);

        assertEquals(new QuantityLength(0.003, LengthUnit.FEET), result);
    }
    // ===============================
// UC7 TEST CASES (14)
// ===============================

    // Test Case 1 (Explicit target = FEET)
    @Test
    void testAddition_ExplicitTargetUnit_Feet() {
        QuantityLength q1 = new QuantityLength(1.0, LengthUnit.FEET);
        QuantityLength q2 = new QuantityLength(12.0, LengthUnit.INCH);

        assertEquals(
                new QuantityLength(2.0, LengthUnit.FEET),
                q1.add(q2, LengthUnit.FEET)
        );
    }

    // Test Case 2 (Explicit target = INCHES)
    @Test
    void testAddition_ExplicitTargetUnit_Inches() {
        QuantityLength q1 = new QuantityLength(1.0, LengthUnit.FEET);
        QuantityLength q2 = new QuantityLength(12.0, LengthUnit.INCH);

        assertEquals(
                new QuantityLength(24.0, LengthUnit.INCH),
                q1.add(q2, LengthUnit.INCH)
        );
    }

    // Test Case 3 (Target different from both → YARDS)
    @Test
    void testAddition_ExplicitTargetUnit_Yards() {
        QuantityLength q1 = new QuantityLength(1.0, LengthUnit.FEET);
        QuantityLength q2 = new QuantityLength(12.0, LengthUnit.INCH);

        QuantityLength result = q1.add(q2, LengthUnit.YARDS);

        assertEquals(0.6666667, result.getValue(), 1e-6);
    }

    // Test Case 4 (Explicit target = CENTIMETERS)
    @Test
    void testAddition_ExplicitTargetUnit_Centimeters() {
        QuantityLength q1 = new QuantityLength(2.54, LengthUnit.CENTIMETERS);
        QuantityLength q2 = new QuantityLength(1.0, LengthUnit.INCH);

        QuantityLength result = q1.add(q2, LengthUnit.CENTIMETERS);

        assertEquals(5.08, result.getValue(), 1e-6);
    }

    // Test Case 5 (Target = first operand)
    @Test
    void testAddition_ExplicitTargetUnit_SameAsFirstOperand() {
        QuantityLength q1 = new QuantityLength(1.0, LengthUnit.YARDS);
        QuantityLength q2 = new QuantityLength(6.0, LengthUnit.FEET);

        assertEquals(
                new QuantityLength(3.0, LengthUnit.YARDS),
                q1.add(q2, LengthUnit.YARDS)
        );
    }

    // Test Case 6 (Target = second operand)
    @Test
    void testAddition_ExplicitTargetUnit_SameAsSecondOperand() {
        QuantityLength q1 = new QuantityLength(2.0, LengthUnit.YARDS);
        QuantityLength q2 = new QuantityLength(3.0, LengthUnit.FEET);

        assertEquals(
                new QuantityLength(9.0, LengthUnit.FEET),
                q1.add(q2, LengthUnit.FEET)
        );
    }

    // Test Case 7 (Commutativity)
    @Test
    void testAddition_ExplicitTargetUnit_Commutativity() {
        QuantityLength A = new QuantityLength(1.0, LengthUnit.FEET);
        QuantityLength B = new QuantityLength(12.0, LengthUnit.INCH);

        QuantityLength r1 = A.add(B, LengthUnit.INCH);
        QuantityLength r2 = B.add(A, LengthUnit.INCH);

        assertTrue(r1.equals(r2));
    }

    // Test Case 8 (Zero operand)
    @Test
    void testAddition_ExplicitTargetUnit_WithZero() {
        QuantityLength q1 = new QuantityLength(5.0, LengthUnit.FEET);
        QuantityLength zero = new QuantityLength(0.0, LengthUnit.INCH);

        QuantityLength result = q1.add(zero, LengthUnit.YARDS);

        assertEquals(1.6666667, result.getValue(), 1e-6);
    }

    // Test Case 9 (Negative values)
    @Test
    void testAddition_ExplicitTargetUnit_NegativeValues() {
        QuantityLength q1 = new QuantityLength(5.0, LengthUnit.FEET);
        QuantityLength q2 = new QuantityLength(-2.0, LengthUnit.FEET);

        assertEquals(
                new QuantityLength(36.0, LengthUnit.INCH),
                q1.add(q2, LengthUnit.INCH)
        );
    }

    // Test Case 10 (Null target)
    @Test
    void testAddition_ExplicitTargetUnit_NullTargetUnit() {
        QuantityLength q1 = new QuantityLength(1.0, LengthUnit.FEET);
        QuantityLength q2 = new QuantityLength(1.0, LengthUnit.FEET);

        assertThrows(IllegalArgumentException.class, () ->
                q1.add(q2, null)
        );
    }

    // Test Case 11 (Large → small scale)
    @Test
    void testAddition_ExplicitTargetUnit_LargeToSmallScale() {
        QuantityLength q1 = new QuantityLength(1000.0, LengthUnit.FEET);
        QuantityLength q2 = new QuantityLength(500.0, LengthUnit.FEET);

        assertEquals(
                new QuantityLength(18000.0, LengthUnit.INCH),
                q1.add(q2, LengthUnit.INCH)
        );
    }

    // Test Case 12 (Small → large scale)
    @Test
    void testAddition_ExplicitTargetUnit_SmallToLargeScale() {
        QuantityLength q1 = new QuantityLength(1.0, LengthUnit.FEET);
        QuantityLength q2 = new QuantityLength(1.0, LengthUnit.FEET);

        QuantityLength result = q1.add(q2, LengthUnit.YARDS);

        assertEquals(0.6666667, result.getValue(), 1e-6);
    }

    // Test Case 13 (All unit combinations)
    @Test
    void testAddition_ExplicitTargetUnit_AllUnitCombinations() {
        QuantityLength q1 = new QuantityLength(1.0, LengthUnit.FEET);
        QuantityLength q2 = new QuantityLength(12.0, LengthUnit.INCH);

        for (LengthUnit unit : LengthUnit.values()) {
            QuantityLength result = q1.add(q2, unit);
            assertNotNull(result);
        }
    }

    // Test Case 14 (Precision tolerance)
    @Test
    void testAddition_ExplicitTargetUnit_PrecisionTolerance() {
        QuantityLength q1 = new QuantityLength(2.54, LengthUnit.CENTIMETERS);
        QuantityLength q2 = new QuantityLength(1.0, LengthUnit.INCH);

        QuantityLength result = q1.add(q2, LengthUnit.CENTIMETERS);

        assertEquals(5.08, result.getValue(), 1e-6);
    }
}