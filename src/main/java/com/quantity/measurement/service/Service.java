package com.quantity.measurement.service;

import com.quantity.measurement.dto.QuantityDTO;

// Application/service layer contract
// Purpose:
// 1. Defines what operations your application provides
// 2. Wraps your domain logic (Quantity)

public interface Service {

    QuantityDTO add(QuantityDTO q1, QuantityDTO q2, String targetUnit);

    QuantityDTO subtract(QuantityDTO q1, QuantityDTO q2, String targetUnit);

    default QuantityDTO multiply(QuantityDTO q1, QuantityDTO q2, String targetUnit) {
        return new QuantityDTO(true, "Multiply operation is not implemented");
    }

    QuantityDTO divide(QuantityDTO q1, QuantityDTO q2);

    default QuantityDTO percentage(QuantityDTO q1, QuantityDTO q2) {
        return new QuantityDTO(true, "Percentage operation is not implemented");
    }

    QuantityDTO convert(QuantityDTO q, String targetUnit);

    QuantityDTO compare(QuantityDTO q1, QuantityDTO q2);
}
