package QuantityMeasurementApp;

import com.quantity.measurement.enums.LengthUnit;
import com.quantity.measurement.model.QuantityLength;

public class MeasurementApplication {

    public static void main(String[] args) {

        QuantityLength q1 = new QuantityLength(1.0, LengthUnit.FEET);
        QuantityLength q2 = new QuantityLength(12.0, LengthUnit.INCH);

        if (q1.equals(q2)) {
            System.out.println("Equal (true)");
        } else {
            System.out.println("Not Equal (false)");
        }
    }
}